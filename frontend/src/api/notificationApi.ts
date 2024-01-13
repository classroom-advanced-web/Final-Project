import instance from './axiosConfig';

class NotificationApi {
  async getNotifications() {
    const res = await instance.get('/notifications');

    return res.data.notifications;
  }

  async markAsRead() {
    const res = await instance.get(`/notifications/status/all`);

    return res.data.notification;
  }
}

const notificationApi = new NotificationApi();
export default notificationApi;
