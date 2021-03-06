import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/account_structures_teams.csv";

export const importAccountStructuresTeams = async () => {
  let data = await csv({ delimiter: [";"] }).fromFile(csvFilePath);
  data = await changeCSV(data);
  return importData(data, 0);
};

async function changeCSV(data) {
  const listTeams = await pool.query({
    sql: `SELECT id, team_number FROM teams`,
    parameters: {}
  });
  const listStructures = await pool.query({
    sql: `SELECT id, code FROM structures`,
    parameters: {}
  });
  data.forEach(element => {
    if (element && element.Identifiant) {
      element.login = element.Identifiant;
      delete element.Identifiant;
      element.password = element["Mot_de_passe"];
      delete element["Mot_de_passe"];
      element.type_of_code = element["Type_de_code"];
      delete element["Type_de_code"];
      element.structure_type = element["Type_de_structure"];
      delete element["Type_de_structure"];
      const structure_code = listStructures.find(
        n => n.code === element["Code_structure"]
      );
      element.structure_code = structure_code ? structure_code.id : null;
      delete element["Code_structure"];
      const team_number = (element.team_number = listTeams.find(
        n => n.team_number === element["Numero_equipe"]
      ));
      element.team_number = team_number ? team_number.id : null;
      delete element["Numero_equipe"];
      element.register_date = element["Date_inscription"];
      delete element["Date_inscription"];
      element.expiration_date = element["Date_expiration"];
      if (
        element["Date_expiration"] == "" ||
        element["Date_expiration"] == "0000-00-00"
      )
        element.expiration_date = null;
      delete element["Date_expiration"];
      element.community = "proxy";
    }
  });
  return data;
}

async function importData(data, i) {
  if (i >= data.length || !data) return;
  await pool.query({
    sql: `INSERT INTO account_structures_teams (login, password, type_of_code, structure_type, structure_code, team_number, register_date, community, expiration_date)
          VALUES ($login, $password, $type_of_code, $structure_type, $structure_code, $team_number, $register_date, $community, $expiration_date)`,
    parameters: {
      login: data[i].login,
      password: data[i].password,
      type_of_code: data[i].type_of_code,
      structure_type: data[i].structure_type,
      structure_code: data[i].structure_code,
      team_number: data[i].team_number,
      register_date: data[i].register_date,
      community: data[i].community,
      expiration_date: data[i].expiration_date
    }
  });
  i++;
  await importData(data, i);
}
