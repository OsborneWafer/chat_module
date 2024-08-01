import { StatusCodes } from "http-status-codes";
import { In, Repository } from "typeorm";
import { ExpressException } from "~/errors";
import { chat_room_users, IChatUsers } from "~/libs";
import { getTypeOrmRepository } from "~/utils";

export const addChatRoomDetails = async (room_name: string, is_group: boolean, users_list: IChatUsers[], group_name?: string) => {
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
                    chat_room_data: true
                }
            })

            if (checkUserChats.length > 0) {
                return checkUserChats
            } else {
                
            }
        }
    }
}