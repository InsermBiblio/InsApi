import Institute from "../../../lib/models/Institute";

describe("model Institute", function() {
  let instituteQueries;

  before(function() {
    instituteQueries = Institute(postgres);
  });

  describe("selectOne", function() {
    it("should return one institute by id", function*() {
      const institute = yield fixtureLoader.createInstitute({
        name: "biology",
        code: "insb"
      });
      const instituteOne = yield instituteQueries.selectBy(institute.id);
      delete instituteOne[0].totalcount;
      assert.deepEqual(instituteOne[0], institute);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  // describe("selectPage", function() {
  //   let biology, chemestry, humanity;
  //   before(function*() {
  //     chemestry = yield fixtureLoader.createInstitute({
  //       name: "chemestry",
  //       code: "52"
  //     });
  //     biology = yield fixtureLoader.createInstitute({
  //       name: "biology",
  //       code: "53"
  //     });
  //     humanity = yield fixtureLoader.createInstitute({
  //       name: "humanity",
  //       code: "54"
  //     });
  //   });

  //   it("should return one institute by id", function*() {
  //     assert.deepEqual(yield instituteQueries.selectPage(), [
  //       {
  //         id: chemestry.id,
  //         totalcount: "3",
  //         name: "chemestry",
  //         code: "52"
  //       },
  //       {
  //         id: biology.id,
  //         totalcount: "3",
  //         name: "biology",
  //         code: "53"
  //       },
  //       {
  //         id: humanity.id,
  //         totalcount: "3",
  //         name: "humanity",
  //         code: "54"
  //       }
  //     ]);
  //   });

  //   after(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("updateOne", function() {
  //   let institute;

  //   beforeEach(function*() {
  //     institute = yield fixtureLoader.createInstitute({
  //       name: "biology"
  //     });
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("insertOne", function() {
  //   let institute;

  //   beforeEach(function*() {
  //     institute = yield fixtureLoader.createInstitute({
  //       name: "biology"
  //     });
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("upsertOnePerCode", function() {
  //   it("should create a new institute if none exists with the same code", function*() {
  //     const institute = yield instituteQueries.upsertOnePerCode({
  //       name: "biology",
  //       code: "53"
  //     });
  //     assert.deepEqual(institute, {
  //       id: institute.id,
  //       name: "biology",
  //       code: "53"
  //     });

  //     const insertedInstitute = yield postgres.queryOne({
  //       sql: "SELECT * from institute WHERE name=$name",
  //       parameters: { name: "biology" }
  //     });
  //     assert.deepEqual(insertedInstitute, institute);
  //   });

  //   it("should update existing institute with the same code", function*() {
  //     const previousInstitute = yield fixtureLoader.createInstitute({
  //       name: "biology",
  //       code: "53"
  //     });
  //     const institute = yield instituteQueries.upsertOnePerCode({
  //       name: "biology",
  //       code: "53"
  //     });
  //     assert.deepEqual(institute, {
  //       id: institute.id,
  //       name: "biology",
  //       code: "53"
  //     });

  //     const updatedInstitute = yield postgres.queryOne({
  //       sql: "SELECT * from institute WHERE id=$id",
  //       parameters: { id: previousInstitute.id }
  //     });
  //     assert.deepEqual(updatedInstitute, institute);
  //     assert.notDeepEqual(updatedInstitute, previousInstitute);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectByIds", function() {
  //   let institute53, institute54;

  //   before(function*() {
  //     [institute53, institute54] = yield ["53", "54", "55"].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute ${code}`
  //       })
  //     );
  //   });

  //   it("should return each institutes with given ids", function*() {
  //     assert.deepEqual(
  //       yield instituteQueries.selectByIds([institute53.id, institute54.id]),
  //       [
  //         {
  //           id: institute53.id,
  //           name: institute53.name,
  //           code: institute53.code
  //         },
  //         {
  //           id: institute54.id,
  //           name: institute54.name,
  //           code: institute54.code
  //         }
  //       ]
  //     );
  //   });

  //   it("should throw an error if trying to retrieve an institute that does not exists", function*() {
  //     let error;

  //     try {
  //       yield instituteQueries.selectByIds([institute53.id, institute54.id, 0]);
  //     } catch (e) {
  //       error = e;
  //     }
  //     assert.equal(error.message, "Institutes 0 does not exists");
  //   });

  //   after(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectByJanusAccountIdQuery", function() {
  //   it("should return additional_institute of user", function*() {
  //     const [institute53, institute54, institute55] = yield [
  //       "53",
  //       "54",
  //       "55"
  //     ].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute ${code}`
  //       })
  //     );

  //     const john = yield fixtureLoader.createJanusAccount({
  //       uid: "john",
  //       additional_institutes: [institute53.id, institute54.id]
  //     });
  //     const jane = yield fixtureLoader.createJanusAccount({
  //       uid: "jane",
  //       additional_institutes: [institute54.id, institute55.id]
  //     });
  //     assert.deepEqual(yield instituteQueries.selectByJanusAccountId(john.id), [
  //       {
  //         id: institute53.id,
  //         code: institute53.code,
  //         name: institute53.name,
  //         totalcount: "2",
  //         index: 0,
  //         janus_account_id: john.id
  //       },
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 1,
  //         janus_account_id: john.id
  //       }
  //     ]);
  //     assert.deepEqual(yield instituteQueries.selectByJanusAccountId(jane.id), [
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 0,
  //         janus_account_id: jane.id
  //       },
  //       {
  //         id: institute55.id,
  //         code: institute55.code,
  //         name: institute55.name,
  //         totalcount: "2",
  //         index: 1,
  //         janus_account_id: jane.id
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectByInistAccountIdQuery", function() {
  //   it("should return additional_institute of user", function*() {
  //     const [institute53, institute54, institute55] = yield [
  //       "53",
  //       "54",
  //       "55"
  //     ].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute ${code}`
  //       })
  //     );

  //     const john = yield fixtureLoader.createInistAccount({
  //       username: "john",
  //       institutes: [institute53.id, institute54.id]
  //     });
  //     const jane = yield fixtureLoader.createInistAccount({
  //       username: "jane",
  //       institutes: [institute54.id, institute55.id]
  //     });
  //     assert.deepEqual(yield instituteQueries.selectByInistAccountId(john.id), [
  //       {
  //         id: institute53.id,
  //         code: institute53.code,
  //         name: institute53.name,
  //         totalcount: "2",
  //         index: 0,
  //         inist_account_id: john.id
  //       },
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 1,
  //         inist_account_id: john.id
  //       }
  //     ]);
  //     assert.deepEqual(yield instituteQueries.selectByInistAccountId(jane.id), [
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 0,
  //         inist_account_id: jane.id
  //       },
  //       {
  //         id: institute55.id,
  //         code: institute55.code,
  //         name: institute55.name,
  //         totalcount: "2",
  //         index: 1,
  //         inist_account_id: jane.id
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectByUnitIdQuery", function() {
  //   it("should return additional_institute of user", function*() {
  //     const [institute53, institute54, institute55] = yield [
  //       "53",
  //       "54",
  //       "55"
  //     ].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute ${code}`
  //       })
  //     );

  //     const cern = yield fixtureLoader.createUnit({
  //       name: "cern",
  //       code: "cern",
  //       institutes: [institute53.id, institute54.id]
  //     });
  //     const inist = yield fixtureLoader.createUnit({
  //       name: "inist",
  //       code: "inist",
  //       institutes: [institute54.id, institute55.id]
  //     });
  //     assert.deepEqual(yield instituteQueries.selectByUnitId(cern.id), [
  //       {
  //         id: institute53.id,
  //         code: institute53.code,
  //         name: institute53.name,
  //         totalcount: "2",
  //         index: 0,
  //         unit_id: cern.id
  //       },
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 1,
  //         unit_id: cern.id
  //       }
  //     ]);
  //     assert.deepEqual(yield instituteQueries.selectByUnitId(inist.id), [
  //       {
  //         id: institute54.id,
  //         code: institute54.code,
  //         name: institute54.name,
  //         totalcount: "2",
  //         index: 0,
  //         unit_id: inist.id
  //       },
  //       {
  //         id: institute55.id,
  //         code: institute55.code,
  //         name: institute55.name,
  //         totalcount: "2",
  //         index: 1,
  //         unit_id: inist.id
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });
});
