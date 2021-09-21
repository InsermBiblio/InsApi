import FedeInsermAccounts from "../../../lib/models/FedeInsermAccounts";

describe("model FedeInsermAccounts", function() {
  let fedeInsermAccountQueries;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 3600 * 24 * 1000);

  before(function() {
    fedeInsermAccountQueries = FedeInsermAccounts(postgres);
  });

  // describe("selectOne", function() {
  //   it("should return one user by id", function*() {
  //     const community = yield fixtureLoader.createCommunity({
  //       name: "vie",
  //       gate: "insb"
  //     });

  //     const section = yield fixtureLoader.createSectionCN({
  //       code: "",
  //       name: ""
  //     });

  //     const institute = yield fixtureLoader.createInstitute({
  //       name: "dgds",
  //       code: "ds99"
  //     });

  //     const rd = yield fixtureLoader.createRegionalsDelegations({
  //       name: "Patrick",
  //       code: "Sebastien"
  //     });

  //     const structure = yield fixtureLoader.createStructure({
  //       structure_type: "CIC",
  //       iunop_code: "",
  //       code: "biology",
  //       name: "BIOMAN",
  //       number_of_certified_team: 0,
  //       regional_delegation: rd.id,
  //       principal_it: institute.id,
  //       specialized_commission: section.id,
  //       community: community.name,
  //       site: "",
  //       street: "",
  //       address_supplement: "",
  //       postal_code: "",
  //       city: "",
  //       country: "",
  //       director_lastname: "",
  //       director_firstname: "",
  //       director_email: "",
  //       email: "",
  //       dc_lastname: "",
  //       dc_firstname: "",
  //       dc_phone: "",
  //       dc_email: "",
  //       mixt_university: "",
  //       cnrs_mixity: "",
  //       other_mixity: "",
  //       total_etp_effectiv: 0,
  //       nb_researchers_inserm_pp: 0,
  //       nb_researchers_inserm_etp: 0,
  //       nb_researchers_crns_pp: 0,
  //       nb_researchers_crns_etp: 0,
  //       nb_researchers_other_pp: 0,
  //       nb_researchers_other_etp: 0,
  //       nb_post_phd_student_pp: 0,
  //       nb_post_phd_student_etp: 0,
  //       nb_phd_student_pp: 0,
  //       nb_phd_student_etp: 0,
  //       nb_cdi_researchers_pp: 0,
  //       nb_cdi_researchers_etp: 0,
  //       nb_cdd_researchers_pp: 0,
  //       nb_cdd_researchers_etp: 0,
  //       nb_teacher_researchers_pp: 0,
  //       nb_teacher_researchers_etp: 0,
  //       nb_pu_ph_pp: 0,
  //       nb_pu_ph_etp: 0,
  //       nb_hosp_others_pp: 0,
  //       nb_hosp_others_etp: 0,
  //       nb_ir_inserm_pp: 0,
  //       nb_individual_account: 0,
  //       nb_structure_account: 0,
  //       nb_team_account: 0,
  //       nb_ir_inserm_etp: 0,
  //       nb_ir_non_inserm_pp: 0,
  //       nb_ir_non_inserm_etp: 0,
  //       nb_ita_others_pp: 0,
  //       nb_ita_others_etp: 0,
  //       nb_cdd_ir_pp: 0,
  //       nb_cdd_ir_etp: 0,
  //       nb_cdd_others_pp: 0,
  //       nb_cdd_others_etp: 0,
  //       nb_admin_pp: 0,
  //       nb_admin_etp: 0,
  //       active: true,
  //       secondary_it: [],
  //       comment: "a comment."
  //     });

  //     const team = yield fixtureLoader.createTeam({
  //       structure_code: structure.id,
  //       team_number: "CIC401-1",
  //       name: "MODULE INNOVATION TECHNOLOGIQUES",
  //       principal_lastname: "BORDENAVE",
  //       principal_firstname: "LAURENCE",
  //       principal_email: "Laurence.Bordenave@chu-bordeaux.fr",
  //       principal_it: institute.id,
  //       specialized_commission: section.id,
  //       total_etp_effectiv: 0,
  //       nb_researchers_inserm_pp: 0,
  //       nb_researchers_inserm_etp: 0,
  //       nb_researchers_crns_pp: 0,
  //       nb_researchers_crns_etp: 0,
  //       nb_researchers_other_pp: 0,
  //       nb_researchers_other_etp: 0,
  //       nb_post_phd_student_pp: 0,
  //       nb_post_phd_student_etp: 0,
  //       nb_phd_student_pp: 0,
  //       nb_phd_student_etp: 0,
  //       nb_cdi_researchers_pp: 0,
  //       nb_cdi_researchers_etp: 0,
  //       nb_cdd_researchers_pp: 0,
  //       nb_cdd_researchers_etp: 0,
  //       nb_teacher_researchers_pp: 0,
  //       nb_teacher_researchers_etp: 0,
  //       nb_pu_ph_pp: 0,
  //       nb_pu_ph_etp: 0,
  //       nb_hosp_others_pp: 0,
  //       nb_hosp_others_etp: 0,
  //       nb_ir_inserm_pp: 0,
  //       nb_ir_inserm_etp: 0,
  //       nb_ir_non_inserm_pp: 0,
  //       nb_ir_non_inserm_etp: 0,
  //       nb_ita_others_pp: 0,
  //       nb_ita_others_etp: 0,
  //       nb_cdd_ir_pp: 0,
  //       nb_cdd_ir_etp: 0,
  //       nb_cdd_others_pp: 0,
  //       nb_cdd_others_etp: 0,
  //       nb_admin_pp: 0,
  //       nb_admin_etp: 0,
  //       active: true,
  //       comment: ""
  //     });

  //     const user = yield fixtureLoader.createIndividualAccount({
  //       uid: "uid",
  //       lastname: "doe",
  //       firstname: "jane",
  //       inserm_email: "",
  //       email: "jane@doe.com",
  //       structure_type: "",
  //       structure_code: structure.id,
  //       community: community.name,
  //       team_number: team.id,
  //       regional_delegation: rd.id,
  //       specialized_commission: section.id,
  //       itmo_principal: institute.id,
  //       secondary_team_code: "",
  //       uinop_code: "",
  //       structure_name: "",
  //       site: "",
  //       city: "",
  //       orcid_number: "",
  //       researcher_id: "",
  //       agent_status: "",
  //       agent_function: "",
  //       membership: "",
  //       type_of_assigned_structure: "",
  //       register_date: "2010-12-12",
  //       last_connection: "2018-12-12",
  //       active: true,
  //       comment: "no comment"
  //     });
  //     assert.deepEqual(
  //       yield fedeInsermAccountQueries.selectOne({ id: user.id }),
  //       {
  //         id: user.id,
  //         uid: "uid",
  //         lastname: "doe",
  //         firstname: "jane",
  //         inserm_email: "",
  //         email: "jane@doe.com",
  //         structure_type: "",
  //         structure_code: structure.id,
  //         community: community.name,
  //         team_number: team.id,
  //         regional_delegation: rd.id,
  //         specialized_commission: section.id,
  //         itmo_principal: institute.id,
  //         secondary_team_code: "",
  //         uinop_code: "",
  //         structure_name: "",
  //         site: "",
  //         city: "",
  //         orcid_number: "",
  //         researcher_id: "",
  //         agent_status: "",
  //         agent_function: "",
  //         membership: "",
  //         type_of_assigned_structure: "",
  //         register_date: new Date("2010-12-12"),
  //         last_connection: new Date("2018-12-12"),
  //         active: true,
  //         comment: "no comment"
  //       }
  //     );
  //   });

  //   after(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectPage", function() {
  //   let john, jane, will, institute53, institute54, institute55, cern, inist;
  //   let in2p3, inc, inee, insb, inshs, insmi, insu;

  //   before(function*() {
  //     [in2p3, inc, inee, insb, inshs, insmi, insu] = yield [
  //       "in2p3",
  //       "inc",
  //       "inee",
  //       "insb",
  //       "inshs",
  //       "insmi",
  //       "insu",
  //       "inp",
  //       "ins2i",
  //       "insis"
  //     ].map(name => fixtureLoader.createCommunity({ name, gate: name }));

  //     const instituteCommunities = {
  //       53: [in2p3.id],
  //       54: [insu.id],
  //       55: [insmi.id]
  //     };
  //     [institute53, institute54, institute55] = yield [53, 54, 55].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute${code}`,
  //         communities: instituteCommunities[code]
  //       })
  //     );

  //     const unitInstitutes = {
  //       cern: [institute53.id],
  //       inist: [institute54.id, institute55.id]
  //     };
  //     [cern, inist] = yield ["cern", "inist"].map(code =>
  //       fixtureLoader.createUnit({
  //         code,
  //         communities: [code === "cern" ? inc.id : inee.id],
  //         institutes: unitInstitutes[code]
  //       })
  //     );

  //     jane = yield fixtureLoader.createJanusAccount({
  //       uid: "jane.doe",
  //       name: "doe",
  //       firstname: "jane",
  //       mail: "jane@doe.com",
  //       cnrs: true,
  //       last_connexion: today,
  //       comment: "jane comment",
  //       communities: [insb.id, inshs.id],
  //       primary_institute: institute54.id,
  //       additional_institutes: [institute53.id],
  //       primary_unit: inist.id,
  //       additional_units: [cern.id],
  //       favorite_domain: insb.name
  //     });

  //     john = yield fixtureLoader.createJanusAccount({
  //       uid: "john.doe",
  //       firstname: "john",
  //       name: "doe",
  //       mail: "john@doe.com",
  //       cnrs: false,
  //       last_connexion: today,
  //       comment: "john comment",
  //       communities: [insb.id, in2p3.id],
  //       primary_institute: institute53.id,
  //       additional_institutes: [institute54.id],
  //       primary_unit: cern.id,
  //       additional_units: [inist.id],
  //       favorite_domain: in2p3.name
  //     });

  //     will = yield fixtureLoader.createJanusAccount({
  //       uid: "will.doe",
  //       firstname: "will",
  //       name: "doe",
  //       mail: "will@doe.com",
  //       cnrs: false,
  //       last_connexion: today,
  //       comment: "will comment",
  //       communities: [insu.id, in2p3.id],
  //       primary_institute: null,
  //       additional_institutes: [],
  //       primary_unit: null,
  //       additional_units: [],
  //       favorite_domain: insu.name
  //     });
  //   });

  //   it("should return one user by id", function*() {
  //     assert.deepEqual(yield fedeInsermAccountQueries.selectPage(), [
  //       {
  //         id: jane.id,
  //         totalcount: "3",
  //         uid: "jane.doe",
  //         name: "doe",
  //         firstname: "jane",
  //         mail: "jane@doe.com",
  //         cnrs: true,
  //         comment: "jane comment",
  //         first_connexion: today,
  //         last_connexion: today,
  //         primary_unit: inist.id,
  //         primary_unit_communities: [inee.id],
  //         additional_units: [cern.id],
  //         primary_institute: institute54.id,
  //         primary_institute_communities: [insu.id],
  //         additional_institutes: [institute53.id],
  //         communities: [insb.id, inshs.id],
  //         all_communities: [insu.id, inee.id, insb.id, inshs.id],
  //         favorite_domain: insb.name,
  //         active: true,
  //         favourite_resources: null
  //       },
  //       {
  //         id: john.id,
  //         totalcount: "3",
  //         uid: "john.doe",
  //         name: "doe",
  //         firstname: "john",
  //         mail: "john@doe.com",
  //         cnrs: false,
  //         comment: "john comment",
  //         first_connexion: today,
  //         last_connexion: today,
  //         primary_unit: cern.id,
  //         primary_unit_communities: [inc.id],
  //         additional_units: [inist.id],
  //         primary_institute: institute53.id,
  //         primary_institute_communities: [in2p3.id],
  //         additional_institutes: [institute54.id],
  //         communities: [insb.id, in2p3.id],
  //         all_communities: [in2p3.id, inc.id, insb.id],
  //         favorite_domain: in2p3.name,
  //         active: true,
  //         favourite_resources: null
  //       },
  //       {
  //         id: will.id,
  //         totalcount: "3",
  //         uid: "will.doe",
  //         name: "doe",
  //         firstname: "will",
  //         mail: "will@doe.com",
  //         cnrs: false,
  //         comment: "will comment",
  //         first_connexion: today,
  //         last_connexion: today,
  //         primary_unit: null,
  //         primary_unit_communities: [],
  //         additional_units: [],
  //         primary_institute: null,
  //         primary_institute_communities: [],
  //         additional_institutes: [],
  //         communities: [insu.id, in2p3.id],
  //         all_communities: [insu.id, in2p3.id],
  //         favorite_domain: insu.name,
  //         active: true,
  //         favourite_resources: null
  //       }
  //     ]);
  //   });

  //   after(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("upsertOnePerUid", function() {
  //   it("should create a new janusAccount if none exists with the same code", function*() {
  //     const primaryInstitute = yield fixtureLoader.createInstitute();
  //     const user = yield fedeInsermAccountQueries.upsertOnePerUid({
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "john",
  //       mail: "john@doe.com",
  //       cnrs: true,
  //       last_connexion: today,
  //       primary_institute: primaryInstitute.id
  //     });
  //     assert.deepEqual(user, {
  //       id: user.id,
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "john",
  //       mail: "john@doe.com",
  //       cnrs: true,
  //       first_connexion: today,
  //       last_connexion: today,
  //       primary_institute: primaryInstitute.id,
  //       primary_unit: null,
  //       active: true,
  //       favourite_resources: null
  //     });

  //     const insertedJanusAccount = yield postgres.queryOne({
  //       sql:
  //         "SELECT id, uid, name, firstname, mail, cnrs, last_connexion, first_connexion, primary_institute, primary_unit, active, favourite_resources from janus_account WHERE uid=$uid",
  //       parameters: { uid: "john.doe" }
  //     });
  //     assert.deepEqual(insertedJanusAccount, user);
  //   });

  //   it("should update existing institute with the same code", function*() {
  //     const primaryInstitute = yield fixtureLoader.createInstitute();
  //     const previousJanusAccount = yield fixtureLoader.createJanusAccount({
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "john",
  //       mail: "john@doe.com",
  //       cnrs: true,
  //       last_connexion: today,
  //       primary_institute: primaryInstitute.id
  //     });

  //     const user = yield fedeInsermAccountQueries.upsertOnePerUid({
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "johnny",
  //       mail: "johnny@doe.com",
  //       cnrs: false,
  //       last_connexion: tomorrow,
  //       primary_institute: null
  //     });

  //     assert.deepEqual(user, {
  //       id: user.id,
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "johnny",
  //       mail: "johnny@doe.com",
  //       cnrs: false,
  //       first_connexion: today,
  //       last_connexion: tomorrow,
  //       primary_institute: null,
  //       primary_unit: null,
  //       active: true,
  //       favourite_resources: null
  //     });

  //     const updatedJanusAccount = yield postgres.queryOne({
  //       sql:
  //         "SELECT id, uid, name, firstname, mail, cnrs, last_connexion, first_connexion, primary_institute, primary_unit, active, favourite_resources from janus_account WHERE id=$id",
  //       parameters: { id: previousJanusAccount.id }
  //     });
  //     assert.deepEqual(updatedJanusAccount, user);
  //     assert.notEqual(
  //       updatedJanusAccount.primary_institute,
  //       previousJanusAccount.primary_institute
  //     );
  //   });

  //   it("should not overwrite current value if receiving undefined", function*() {
  //     const primaryInstitute = yield fixtureLoader.createInstitute();
  //     const previousJanusAccount = yield fixtureLoader.createJanusAccount({
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "john",
  //       mail: "john@doe.com",
  //       cnrs: false,
  //       last_connexion: today,
  //       primary_institute: primaryInstitute.id
  //     });

  //     const user = yield fedeInsermAccountQueries.upsertOnePerUid({
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: undefined,
  //       mail: undefined,
  //       cnrs: undefined,
  //       last_connexion: tomorrow,
  //       primary_institute: null
  //     });

  //     assert.deepEqual(user, {
  //       id: user.id,
  //       uid: "john.doe",
  //       name: "doe",
  //       firstname: "john",
  //       mail: "john@doe.com",
  //       cnrs: false,
  //       first_connexion: today,
  //       last_connexion: tomorrow,
  //       primary_institute: null,
  //       primary_unit: null,
  //       active: true,
  //       favourite_resources: null
  //     });

  //     const updatedJanusAccount = yield postgres.queryOne({
  //       sql:
  //         "SELECT id, uid, name, firstname, mail, cnrs, last_connexion, first_connexion, primary_institute, primary_unit, active, favourite_resources from janus_account WHERE id=$id",
  //       parameters: { id: previousJanusAccount.id }
  //     });
  //     assert.deepEqual(updatedJanusAccount, user);
  //     assert.notEqual(
  //       updatedJanusAccount.primary_institute,
  //       previousJanusAccount.primary_institute
  //     );
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("updateCommunities", function() {
  //   let janusAccount, insb, inc, inshs;

  //   beforeEach(function*() {
  //     [insb, inc, inshs] = yield ["insb", "inc", "inshs"].map(name =>
  //       fixtureLoader.createCommunity({ name })
  //     );

  //     yield fixtureLoader.createJanusAccount({
  //       uid: "john",
  //       communities: [insb.id, inc.id]
  //     });
  //     janusAccount = yield postgres.queryOne({
  //       sql: "SELECT * FROM janus_account WHERE uid=$uid",
  //       parameters: { uid: "john" }
  //     });
  //   });

  //   it("should throw an error if trying to add a community which does not exists and abort modification", function*() {
  //     let error;
  //     try {
  //       yield fedeInsermAccountQueries.updateCommunities(
  //         ["nemo", inshs.id],
  //         janusAccount.id
  //       );
  //     } catch (e) {
  //       error = e.message;
  //     }

  //     assert.equal(error, "Communities nemo does not exists");

  //     const janusAccountCommunities = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_community WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountCommunities, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: insb.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: inc.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   it("should add given new community", function*() {
  //     yield fedeInsermAccountQueries.updateCommunities(
  //       [insb.id, inc.id, inshs.id],
  //       janusAccount.id
  //     );

  //     const janusAccountCommunities = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_community WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountCommunities, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: insb.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: inc.id,
  //         index: 1
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: inshs.id,
  //         index: 2
  //       }
  //     ]);
  //   });

  //   it("should remove missing community", function*() {
  //     yield fedeInsermAccountQueries.updateCommunities(
  //       [insb.id],
  //       janusAccount.id
  //     );

  //     const janusAccountCommunities = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_community WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountCommunities, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: insb.id,
  //         index: 0
  //       }
  //     ]);
  //   });

  //   it("should update janus_account_community index", function*() {
  //     yield fedeInsermAccountQueries.updateCommunities(
  //       [inc.id, insb.id],
  //       janusAccount.id
  //     );

  //     const janusAccountCommunities = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_community WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountCommunities, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: inc.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         community_id: insb.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("updateAdditionalInstitutes", function() {
  //   let janusAccount, institute53, institute54, institute55;

  //   beforeEach(function*() {
  //     [institute53, institute54, institute55] = yield ["53", "54", "55"].map(
  //       code =>
  //         fixtureLoader.createInstitute({
  //           code,
  //           name: `Institute ${code}`
  //         })
  //     );

  //     yield fixtureLoader.createJanusAccount({
  //       uid: "john",
  //       additional_institutes: [institute53.id, institute54.id]
  //     });
  //     janusAccount = yield postgres.queryOne({
  //       sql: "SELECT * FROM janus_account WHERE uid=$uid",
  //       parameters: { uid: "john" }
  //     });
  //   });

  //   it("should throw an error if trying to add an institute which does not exists and abort modification", function*() {
  //     let error;
  //     try {
  //       yield fedeInsermAccountQueries.updateAdditionalInstitutes(
  //         [0, institute55.id],
  //         janusAccount.id
  //       );
  //     } catch (e) {
  //       error = e.message;
  //     }

  //     assert.equal(error, "Institutes 0 does not exists");

  //     const janusAccountInstitutes = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_institute WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountInstitutes, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute53.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute54.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   it("should add given new institute", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalInstitutes(
  //       [institute53.id, institute54.id, institute55.id],
  //       janusAccount.id
  //     );

  //     const janusAccountInstitutes = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_institute WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountInstitutes, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute53.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute54.id,
  //         index: 1
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute55.id,
  //         index: 2
  //       }
  //     ]);
  //   });

  //   it("should remove missing institute", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalInstitutes(
  //       [institute53.id],
  //       janusAccount.id
  //     );

  //     const janusAccountInstitutes = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_institute WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountInstitutes, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute53.id,
  //         index: 0
  //       }
  //     ]);
  //   });

  //   it("should update janus_account_institute index", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalInstitutes(
  //       [institute54.id, institute53.id],
  //       janusAccount.id
  //     );

  //     const janusAccountInstitutes = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_institute WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountInstitutes, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute54.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         institute_id: institute53.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("updateAdditionalUnits", function() {
  //   let janusAccount, cern, inist, cnrs;

  //   beforeEach(function*() {
  //     [cern, inist, cnrs] = yield ["cern", "inist", "cnrs"].map(code =>
  //       fixtureLoader.createUnit({ code })
  //     );

  //     yield fixtureLoader.createJanusAccount({
  //       uid: "john",
  //       additional_units: [cern.id, inist.id]
  //     });
  //     janusAccount = yield postgres.queryOne({
  //       sql: "SELECT * FROM janus_account WHERE uid=$uid",
  //       parameters: { uid: "john" }
  //     });
  //   });

  //   it("should throw an error if trying to add a unit which does not exists and abort modification", function*() {
  //     let error;
  //     try {
  //       yield fedeInsermAccountQueries.updateAdditionalUnits(
  //         [0, cnrs.id],
  //         janusAccount.id
  //       );
  //     } catch (e) {
  //       error = e.message;
  //     }

  //     assert.equal(error, "Units 0 does not exists");

  //     const janusAccountUnits = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_unit WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountUnits, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: cern.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: inist.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   it("should add given new units", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalUnits(
  //       [cern.id, inist.id, cnrs.id],
  //       janusAccount.id
  //     );

  //     const janusAccountUnits = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_unit WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountUnits, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: cern.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: inist.id,
  //         index: 1
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: cnrs.id,
  //         index: 2
  //       }
  //     ]);
  //   });

  //   it("should remove missing units", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalUnits(
  //       [cern.id],
  //       janusAccount.id
  //     );

  //     const janusAccountUnits = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_unit WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountUnits, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: cern.id,
  //         index: 0
  //       }
  //     ]);
  //   });

  //   it("should update janus_account_unit index", function*() {
  //     yield fedeInsermAccountQueries.updateAdditionalUnits(
  //       [inist.id, cern.id],
  //       janusAccount.id
  //     );

  //     const janusAccountUnits = yield postgres.queries({
  //       sql:
  //         "SELECT * FROM janus_account_unit WHERE janus_account_id=$id ORDER BY index ASC",
  //       parameters: { id: janusAccount.id }
  //     });
  //     assert.deepEqual(janusAccountUnits, [
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: inist.id,
  //         index: 0
  //       },
  //       {
  //         janus_account_id: janusAccount.id,
  //         unit_id: cern.id,
  //         index: 1
  //       }
  //     ]);
  //   });

  //   afterEach(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });

  // describe("selectEzTicketInfoForId", function() {
  //   let user, institute53, institute54, institute55, cern, inist;
  //   let in2p3, insmi, insu, inee, inc, insb, inshs, reaxys;

  //   before(function*() {
  //     [in2p3, insmi, insu, inee, inc, insb, inshs, reaxys] = yield [
  //       "in2p3",
  //       "insmi",
  //       "insu",
  //       "inee",
  //       "inc",
  //       "insb",
  //       "inshs",
  //       "reaxys",
  //       "inp",
  //       "ins2i",
  //       "insis"
  //     ].map(name => fixtureLoader.createCommunity({ name, gate: name }));

  //     const instituteCommunity = {
  //       53: in2p3.id,
  //       54: insu.id,
  //       55: insmi.id
  //     };

  //     [institute53, institute54, institute55] = yield [53, 54, 55].map(code =>
  //       fixtureLoader.createInstitute({
  //         code,
  //         name: `Institute${code}`,
  //         communities: [instituteCommunity[code]]
  //       })
  //     );

  //     [cern, inist] = yield ["cern", "inist"].map(code =>
  //       fixtureLoader.createUnit({
  //         code,
  //         communities: [code === "cern" ? inc.id : inee.id, reaxys.id],
  //         institutes: [institute55.id]
  //       })
  //     );

  //     user = yield fixtureLoader.createJanusAccount({
  //       uid: "uid",
  //       name: "doe",
  //       firstname: "jane",
  //       mail: "jane@doe.com",
  //       cnrs: false,
  //       comment: "no comment",
  //       last_connexion: today,
  //       communities: [insb.id, inshs.id],
  //       primary_institute: institute54.id,
  //       additional_institutes: [institute53.id],
  //       primary_unit: inist.id,
  //       additional_units: [cern.id]
  //     });
  //   });

  //   it("should return groups for ez-ticket", function*() {
  //     assert.deepEqual(
  //       yield fedeInsermAccountQueries.selectEzTicketInfoForId(user.id),
  //       {
  //         username: `${user.mail}_O_OTHER_I_54_OU_inist`,
  //         groups: ["insu", "inee", "reaxys", "insb", "inshs"]
  //       }
  //     );
  //   });

  //   after(function*() {
  //     yield fixtureLoader.clear();
  //   });
  // });
});
