import axios from 'axios';

describe('create a loan POST /api', () => {
  it('should create a loan', async () => {
    const res = await axios.post(`/api`);

    expect(res.status).toBe(201);
    expect(res.data).toEqual({ success: true });
  });
});
