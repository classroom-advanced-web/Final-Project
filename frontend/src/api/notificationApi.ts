import instance from './axiosConfig';

class NotificationApi {
  async getNotifications() {
    const res = await instance.get('/notifications');

    return res.data.notifications;
  }
}

const notificationApi = new NotificationApi();
export default notificationApi;
