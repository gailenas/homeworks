const expect = require('chai').expect;
const user = require('../apis/user.api');
const { v4: uuidv4 } = require('uuid');

describe('User data api', async () => {
  let req;
  let body;
  let bodyObject;

  before(async () => {
    req = await user.returnAllUserItems();
    expect(req.status).to.equal(200);

    body = await req.text();
    expect(typeof body).to.equal('string');

    bodyObject = await JSON.parse(body);
    expect(typeof bodyObject).to.equal('object');
  });

  it('Verify that user items API returns all data', async () => {
    expect(bodyObject[0].items.length).to.equal(bodyObject[0].item_count);
  });

  it('Verify that user can access his items by item ID', async () => {
    for (const iterator of bodyObject[0].items) {
      const req = await user.returnSpecificUserItem(iterator);
      expect(req.status).to.equal(200);

      const body = await req.text();
      expect(typeof body).to.equal('string');

      const bodyObject = await JSON.parse(body);
      expect(typeof bodyObject).to.equal('object');
      for (const iterator of bodyObject) {
        expect(iterator).not.to.empty;
      }
    }
  });

  it('Verify that second user item contains correct data', async () => {
    const req = await user.returnSpecificUserItem(bodyObject[0].items[1]);
    const body = await req.text();
    const secondItemBodyObject = (await JSON.parse(body))[0];

    [
      'id',
      'title',
      'tags',
      'files',
      'fields',
      'shares',
      'created_at',
      'updated_at',
    ].forEach((key) => {
      expect(secondItemBodyObject.hasOwnProperty(key)).to.be.true;
    });

    expect(
      secondItemBodyObject.created_at < secondItemBodyObject.updated_at &&
        secondItemBodyObject.updated_at < new Date().toISOString()
    ).to.be.true;
  });

  it('Verify that user can add new items', async () => {
    const compareObjects = (object1, object2) => {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (typeof object1[key] === 'string') {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
      }

      return true;
    };

    const expectedResponse = [
      {
        id: 'adb9be68-7cf9-4ab3-9c23-b1e349464c98',
        title: 'Homework API task v1',
        tags: ['task', 'homework', 'api'],
        files: [
          {
            id: 'dh612ehd28d229d334d4391ddq',
            name: 'comment.txt',
            size: 11560,
            content_path: 'vault/sjda123/files/dsjlfkj123/file',
          },
          {
            id: 'u27djaoad8au2d282dd27df22',
            name: 'selfie.png',
            size: 83,
            content_path: 'vault/ftpee34qwer/files/dh612ed91ddq/file',
          },
        ],
        fields: [
          {
            id: 'a33c4fef-7e6c-4c04-88ed-4b7cbe0d8514',
            label: 'My strong password',
            type: 'password',
            value: 'WW91V2VyZUg0Y2szZA==',
          },
          {
            id: '8f4a8eba-56b5-4cfa-a810-cd9486f9bf7f',
            label: 'Nordpass website',
            type: 'url',
            value: 'https://app.nordpass.com/login',
          },
          {
            id: '7b1f54df-acc3-4c0a-a76f-3e352257d3ab',
            label: 'Admin email address',
            type: 'email',
            value: 'admin@example.com',
          },
        ],
        created_at: '2022-04-29T12:01:05.123456780Z',
        updated_at: '2022-12-12T17:20:05.876543210Z',
      },
    ];

    const expectedPayload = {
      id: uuidv4(),
      title: 'Newly added item',
      tags: ['api', 'post', 'homework'],
      files: [
        {
          id: uuidv4(),
          name: 'file.txt',
          size: 1234,
          content_path: 'vault/ftpee34qwer/files/asdf54434sd/file',
        },
      ],
      fields: [
        {
          id: uuidv4(),
          label: 'Wordpress Admin',
          type: 'password',
          value: 'admin',
        },
      ],
    };

    let userCreationReq = await user.createSpecificUserItem(expectedPayload);
    expect(userCreationReq.status).to.equal(201);
    const userCreationBody = await userCreationReq.text();
    const userCreationBodyObject = JSON.parse(userCreationBody);

    expect(compareObjects(expectedResponse[0], userCreationBodyObject[0])).to
      .true;
  });

  it('This test should fail, explanation in the code', async () => {
    // At this point there should be input validation, as I can pass anything in payload.
    // With incorrect values it should return 404 or any other status code that indicates incorrect data
    const wrongPayload = {
      anything: 'anything',
      function: (async () => {
        // Without proper validation here could be a some type of injection used
      })(),
    };

    req = await user.createSpecificUserItem(wrongPayload);
    expect(req.status).to.equal(404);
  });
});
