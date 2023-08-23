const expect = require('chai').expect;
const login = require('../apis/login.api');

describe('Checking LOGIN method', async () => {
  it('JWT should be returnd for existing user', async () => {
    const req = await login.generateSessionJwt();
    expect(req.status).to.equal(200);
    const body = await req.text();
    expect(typeof body).to.equal('string');
  });

  it('Verify if JWT contains correct data', async () => {
    const expectedJwtDetails = {
      info: 'Homework task (Welcome)',
      sub: '1234567890',
      name: 'John Doe',
      user_uuid: '89652fc1-a523-458e-8101-7b8cadc9791e',
      password: 'veryStrongPassword',
      iat: 1689239022,
      signature_key: 'mySecretKey123',
      nonce: '987654321',
    };

    const parseJwt = async (token) => {
      return await JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
    };

    const req = await login.generateSessionJwt();
    expect(req.status).to.equal(200);
    const body = await req.text();

    const jwtDecoded = await parseJwt(body);
    expect(jwtDecoded.user_uuid).to.equal(expectedJwtDetails.user_uuid);
    // Issue with a JWT is that password is not encrypted, name and surname should not be visible due to GDPR
  });

  it('x-rate-limit should not allow to login after several tries', async () => {
    let reqStatus = 200;

    while (reqStatus !== 429) {
      reqStatus = (await login.generateSessionJwt()).status;
    }

    expect(reqStatus).to.equal(429);
  });
});
