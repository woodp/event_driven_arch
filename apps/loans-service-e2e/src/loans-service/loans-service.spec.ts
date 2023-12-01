import axios from 'axios';

describe('create a loan POST /api', () => {
  it('should create a loan when notifications are enabled', async () => {
    const notificationsResponse = await axios.post(`/api/notifications`, { enabled: true });
    expect(notificationsResponse.status).toBe(201);

    const res = await axios.post(`/api`);
    expect(res.status).toBe(201);
    expect(res.data).toEqual({ success: true });
  }, 70000);

  it('should create a loan when notifications are not enabled', async () => {
    const notificationsResponse = await axios.post(`/api/notifications`, { enabled: false });
    expect(notificationsResponse.status).toBe(201);

    const res = await axios.post(`/api`);
    expect(res.status).toBe(201);
    expect(res.data).toEqual({ success: true });
  }, 70000);
});
