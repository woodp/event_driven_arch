import axios from 'axios';

describe('create a loan POST /api', () => {
  it('should create a loan when notifications are working (email)', async () => {
    const resp = await axios.post(`/api`, { type: 'email' });
    expect(resp.status).toBe(201);
    expect(resp.data).toEqual({ success: true });
  }, 70000);

  it('should create a loan when notifications are failing (SMS)', async () => {
    const resp = await axios.post(`/api`, { type: 'sms' });
    expect(resp.status).toBe(201);
    expect(resp.data).toEqual({ success: true });
  }, 70000);
});
