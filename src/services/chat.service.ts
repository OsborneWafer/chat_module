import { StatusCodes } from "http-status-codes";
import { In, Repository } from "typeorm";
import { ExpressException } from "~/errors";
import { chat_room, chat_room_users, chat_socket, IChatUsers } from "~/libs";
import { getTypeOrmRepository } from "~/utils";

export const addChatRoomDetails = async (room_name: string, is_group: boolean, users_list: IChatUsers[], group_name: string) => {
    if (users_list.length < 2) {
        throw new ExpressException(`Minimum users required is 2, got ${users_list.length}`, StatusCodes.FAILED_DEPENDENCY)
    } else {
        if (is_group == true && (!group_name || group_name.trim() == '')) {
            throw new ExpressException(`Group name cannot be empty`, StatusCodes.FAILED_DEPENDENCY)
        }

        const chatRoomUsersList: number[] = [];

        users_list.map(data => {
            const selectedUser  = data.user_id;
            if (chatRoomUsersList.length <= 0) {
                chatRoomUsersList.push(selectedUser)
            } else {
                const userPos = chatRoomUsersList.findIndex(user => user == selectedUser)
                if (userPos < 0) {
                    chatRoomUsersList.push(selectedUser)
                }
            }
        })

        const chatRoomUsersRepo = getTypeOrmRepository(chat_room_users) as Repository<chat_room_users>;
        const chatRoomRepo = getTypeOrmRepository(chat_room) as Repository<chat_room>;
        if (is_group == false && chatRoomUsersList.length == 2) {

            const checkUserChats = await chatRoomUsersRepo.find({
                where: {
                    user_id: In(chatRoomUsersList),
                    chat_room_data: {
                        is_group: false,
                        is_deleted: false
                    }
                },
                relations: {
                    chat_room_data: {
                        chatSocket: true
                    }
                }
            })
            console.log(`checkUserChats ${JSON.stringify(checkUserChats)}`);

            if (checkUserChats.length == 2) {
                return checkUserChats[0].chat_room_data
            } else {
                const newChatRoom = await createNewChatRoom(room_name,is_group,users_list,group_name);
                return newChatRoom;
            }
        } else {
            const checkUserGroupChat = await chatRoomRepo.findOne({
                where: {
                    name: group_name.trim(),
                    is_group: true,
                    is_deleted: false
                },
                relations: {
                    chatSocket: true
                }
            })

            if (checkUserGroupChat) {
                return checkUserGroupChat
            } else {
                const newChatRoom = await createNewChatRoom(room_name,is_group,users_list,group_name);
                return newChatRoom;
            }
        }
    }
}

export const createNewChatRoom = async (room_name: string, is_group: boolean, users_list: IChatUsers[], group_name: string) => {
    if (is_group == true && (!group_name || group_name.trim() == '')) {
        throw new ExpressException(`Group name cannot be empty`, StatusCodes.FAILED_DEPENDENCY)
    }

    const chatRoomRepo = getTypeOrmRepository(chat_room) as Repository<chat_room>;
    const chatSocketRepo = getTypeOrmRepository(chat_socket) as Repository<chat_socket>;
    const chatRoomUsersRepo = getTypeOrmRepository(chat_room_users) as Repository<chat_room_users>;
    
    const newChatRoom = await chatRoomRepo.save({
        name: group_name, // is_group == false ? room_name :
        is_group
    })
    console.log(`New Chat room created ${JSON.stringify(newChatRoom)}`);

    const newSocketRoom = await chatSocketRepo.save({
        socket_room: room_name,
        chat_room_id: newChatRoom.id
    })
    console.log(`New Socket room created ${JSON.stringify(newSocketRoom)}`);

    const newChatRoomUsers = users_list.map(data => {
        return {
            ...data,
            chat_room_id: newChatRoom.id
        }
    })

    const newChatRoomUsersResp = await chatRoomUsersRepo.insert(newChatRoomUsers);
    console.log(`New Chat room users created ${JSON.stringify(newChatRoomUsersResp)}`);

    return {
        ...newChatRoom,
        chatSocket: newSocketRoom
    };
}