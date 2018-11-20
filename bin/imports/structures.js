import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/structures.csv";
const csvFilePath2 = "./imports/structures2.csv";

export const importStructures = async () => {
  let data = await csv({ delimiter: [";"] }).fromFile(csvFilePath);
  let data2 = await csv({ delimiter: [";"] }).fromFile(csvFilePath2);
  data = await changeCSV(data, data2);
  return importData(data, 0);
};

async function changeCSV(data, data2) {
  const listRegionalsDelegations = await pool.query({
    sql: `SELECT id, code FROM regionals_delegations`,
    parameters: {}
  });
  const listInstitute = await pool.query({
    sql: `SELECT id, code FROM institute`,
    parameters: {}
  });
  const listSpecializedCommission = await pool.query({
    sql: `SELECT id, code FROM section_cn`,
    parameters: {}
  });
  data.forEach(element => {
    element.structure_type = element.StructureT;
    element.iunop_code = element.iunop;
    delete element.iunop;
    element.code = element.StructureT + element.StructureC;
    delete element.StructureT;
    delete element.StructureC;
    element.name = element.Intitulé_structure;
    delete element.Intitulé_structure;
    element.number_of_certified_team = element.nb_eq_label;
    delete element.nb_eq_label;
    if (element.DR) {
      element.regional_delegation = listRegionalsDelegations.find(
        n => n.code === element.DR
      ).id;
      delete element.DR;
    }
    element.site = element.Localisation;
    delete element.Localisation;
    element.street = element.adresse1 + " " + element.adresse2;
    delete element.adresse1;
    delete element.adresse2;
    element.address_supplement =
      element.complementAdresse + element.complementEtranger;
    delete element.complementAdresse;
    delete element.complementEtranger;
    element.postal_code = element.CP;
    delete element.CP;
    element.city = element.ville;
    delete element.ville;
    element.country = element.pays;
    delete element.pays;
    element.director_lastname = element.directeur_nom;
    delete element.directeur_nom;
    element.director_firstname = element.directeur_prénom;
    delete element.directeur_prénom;
    element.director_email = element.directeur_email;
    delete element.directeur_email;
    element.email = element.email_structure;
    delete element.email_structure;
    element.dc_lastname = element.Nom_CD;
    delete element.Nom_CD;
    element.dc_firstname = element.Prénom_CD;
    delete element.Prénom_CD;
    element.dc_phone = element.Tel_CD;
    delete element.Tel_CD;
    element.dc_email = element.Courriel_CD;
    delete element.Courriel_CD;
    element.mixt_university = element["Université de mixité"];
    delete element["Université de mixité"];
    element.cnrs_mixity = element["Mixité CNRS"];
    delete element["Mixité CNRS"];
    if (element["Mixité-autres_1"] != "" && element.Mixité_autres_2 != "")
      element["Mixité-autres_1"] += ";";
    if (element.Mixité_autres_3 != "") element.Mixité_autres_2 += ";";
    element.other_mixity =
      element["Mixité-autres_1"] +
      element.Mixité_autres_2 +
      element.Mixité_autres_3;
    delete element["Mixité-autres_1"];
    delete element.Mixité_autres_2;
    delete element.Mixité_autres_3;
    element.principal_it = listInstitute.find(n => n.code === element.IT1).id;
    delete element.IT1;
    if (element.IT2) {
      element.secondary_it = [
        element.IT2,
        element.IT3,
        element.IT4,
        element.IT5
      ];
      delete element.IT2;
      delete element.IT3;
      delete element.IT4;
      delete element.IT5;
    }
    element.specialized_commission = listSpecializedCommission.find(
      n => n.code === element.CSS1
    ).id;
    delete element.CSS1;
    delete element.CSS2;
    if (element.etp_total) {
      element.total_etp_effectiv = element.etp_total.replace(",", ".");
    }
    delete element.etp_total;
  });
  data2.forEach(element => {
    if (element["Chercheurs _Inserm_PP"]) {
      element.nb_researchers_inserm_pp = element[
        "Chercheurs _Inserm_PP"
      ].replace(",", ".");
    }
    delete element["Chercheurs _Inserm_PP"];
    if (element["Chercheurs _Inserm_ETP"]) {
      element.nb_researchers_inserm_etp = element[
        "Chercheurs _Inserm_ETP"
      ].replace(",", ".");
    }
    delete element["Chercheurs _Inserm_ETP"];
    if (element.Chercheurs_CNRS_PP) {
      //changer
      element.nb_researchers_crns_pp = element.Chercheurs_CNRS_PP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_CNRS_PP;
    if (element.Chercheurs_CNRS_ETP) {
      element.nb_researchers_crns_etp = element.Chercheurs_CNRS_ETP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_CNRS_ETP;
    if (element.Chercheurs_autres_PP) {
      element.nb_researchers_other_pp = element.Chercheurs_autres_PP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_autres_PP;
    if (element.Chercheurs_autres_ETP) {
      element.nb_researchers_other_etp = element.Chercheurs_autres_ETP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_autres_ETP;
    if (element["Post-Doctorants_PP"]) {
      element.nb_post_phd_student_pp = element["Post-Doctorants_PP"].replace(
        ",",
        "."
      );
    }
    delete element["Post-Doctorants_PP"];
    if (element["Post-Doctorants_ETP"]) {
      element.nb_post_phd_student_etp = element["Post-Doctorants_ETP"].replace(
        ",",
        "."
      );
    }
    delete element["Post-Doctorants_ETP"];
    if (element.Doctorants_PP) {
      element.nb_phd_student_pp = element.Doctorants_PP.replace(",", ".");
    }
    delete element.Doctorants_PP;
    if (element.Doctorants_ETP) {
      element.nb_phd_student_etp = element.Doctorants_ETP.replace(",", ".");
    }
    delete element.Doctorants_ETP;
    if (element.CDI_Chercheurs_PP) {
      element.nb_cdi_researchers_pp = element.CDI_Chercheurs_PP.replace(
        ",",
        "."
      );
    }
    delete element.CDI_Chercheurs_PP;
    if (element.CDI_Chercheurs_ETP) {
      element.nb_cdi_researchers_etp = element.CDI_Chercheurs_ETP.replace(
        ",",
        "."
      );
    }
    delete element.CDI_Chercheurs_ETP;
    if (element.CDD_Chercheurs_PP) {
      element.nb_cdd_researchers_pp = element.CDD_Chercheurs_PP.replace(
        ",",
        "."
      );
    }
    delete element.CDD_Chercheurs_PP;
    if (element.CDD_Chercheurs_ETP) {
      element.nb_cdd_researchers_etp = element.CDD_Chercheurs_ETP.replace(
        ",",
        "."
      );
    }
    delete element.CDD_Chercheurs_ETP;
    if (element["Ens-Chercheurs_PP"]) {
      element.nb_teacher_researchers_pp = element["Ens-Chercheurs_PP"].replace(
        ",",
        "."
      );
    }
    delete element["Ens-Chercheurs_PP"];
    if (element["Ens-Chercheurs_ETP"]) {
      element.nb_teacher_researchers_etp = element[
        "Ens-Chercheurs_ETP"
      ].replace(",", ".");
    }
    delete element["Ens-Chercheurs_ETP"];
    if (element["PU-PH_PP"]) {
      element.nb_pu_ph_pp = element["PU-PH_PP"].replace(",", ".");
    }
    delete element["PU-PH_PP"];
    if (element["PU-PH_ETP"]) {
      element.nb_pu_ph_etp = element["PU-PH_ETP"].replace(",", ".");
    }
    delete element["PU-PH_ETP"];
    if (element["Hosp-Autres_PP"]) {
      element.nb_hosp_others_pp = element["Hosp-Autres_PP"].replace(",", ".");
    }
    delete element["Hosp-Autres_PP"];
    if (element["Hosp-Autres_ETP"]) {
      element.nb_hosp_others_etp = element["Hosp-Autres_ETP"].replace(",", ".");
    }
    delete element["Hosp-Autres_ETP"];
    if (element.IR_Inserm_PP) {
      element.nb_ir_inserm_pp = element.IR_Inserm_PP.replace(",", ".");
    }
    delete element.IR_Inserm_PP;
    if (element.IR_Inserm_ETP) {
      element.nb_ir_inserm_etp = element.IR_Inserm_ETP.replace(",", ".");
    }
    delete element.IR_Inserm_ETP;
    if (element.IR_non_Inserm_PP) {
      element.nb_ir_non_inserm_pp = element.IR_non_Inserm_PP.replace(",", ".");
    }
    delete element.IR_non_Inserm_PP;
    if (element.IR_non_Inserm_ETP) {
      element.nb_ir_non_inserm_etp = element.IR_non_Inserm_ETP.replace(
        ",",
        "."
      );
    }
    delete element.IR_non_Inserm_ETP;
    if (element["IngT _PP"]) {
      element.nb_ita_others_pp = element["IngT _PP"].replace(",", ".");
    }
    delete element["IngT _PP"];
    if (element["IngT _ETP"]) {
      element.nb_ita_others_etp = element["IngT _ETP"].replace(",", ".");
    }
    delete element["IngT _ETP"];
    if (element.CDD_IR_PP) {
      element.nb_cdd_ir_pp = element.CDD_IR_PP.replace(",", ".");
    }
    delete element.CDD_IR_PP;
    if (element.CDD_IR_ETP) {
      element.nb_cdd_ir_etp = element.CDD_IR_ETP.replace(",", ".");
    }
    delete element.CDD_IR_ETP;
    if (element.CDD_Autres_PP) {
      element.nb_cdd_others_pp = element.CDD_Autres_PP.replace(",", ".");
    }
    delete element.CDD_Autres_PP;
    if (element.CDD_Autres_ETP) {
      element.nb_cdd_others_etp = element.CDD_Autres_ETP.replace(",", ".");
    }
    delete element.CDD_Autres_ETP;
    if (element.Admin_PP) {
      element.nb_admin_pp = element.Admin_PP.replace(",", ".");
    }
    delete element.Admin_PP;
    if (element.Admin_ETP) {
      element.nb_admin_etp = element.Admin_ETP.replace(",", ".");
    }
    delete element.Admin_ETP;
    element.community = "INSERM";
  });
  data = await fusionByCode(data, data2);
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const structure = await pool.query({
    sql: `INSERT INTO structures (structure_type, iunop_code, code, name, number_of_certified_team, regional_delegation, site, street, address_supplement,
       postal_code, city, country, director_lastname, director_firstname, director_email, email, dc_lastname, dc_firstname, dc_phone, dc_email,
        mixt_university, cnrs_mixity, other_mixity, principal_it, specialized_commission, total_etp_effectiv,
          nb_researchers_inserm_pp, nb_researchers_inserm_etp, nb_researchers_crns_pp, nb_researchers_crns_etp,
          nb_researchers_other_pp, nb_researchers_other_etp, nb_post_phd_student_pp, nb_post_phd_student_etp, nb_phd_student_pp, nb_phd_student_etp, nb_cdi_researchers_pp,
          nb_cdi_researchers_etp, nb_cdd_researchers_pp, nb_cdd_researchers_etp, nb_teacher_researchers_pp, nb_teacher_researchers_etp, nb_pu_ph_pp, nb_pu_ph_etp, nb_hosp_others_pp,
          nb_hosp_others_etp, nb_ir_inserm_pp, nb_ir_inserm_etp, nb_ir_non_inserm_pp, nb_ir_non_inserm_etp, nb_ita_others_pp, nb_ita_others_etp, nb_cdd_ir_pp,
          nb_cdd_ir_etp, nb_cdd_others_pp, nb_cdd_others_etp, nb_admin_pp, nb_admin_etp, community) VALUES ($structure_type, $iunop_code, $code, $name,
           $number_of_certified_team, $regional_delegation, $site, $street, $address_supplement, $postal_code, $city, $country, $director_lastname, $director_firstname,
            $director_email, $email, $dc_lastname, $dc_firstname, $dc_phone, $dc_email, $mixt_university, $cnrs_mixity, $other_mixity, $principal_it,
             $specialized_commission, $total_etp_effectiv, $nb_researchers_inserm_pp, $nb_researchers_inserm_etp, $nb_researchers_crns_pp, $nb_researchers_crns_etp,
             $nb_researchers_other_pp, $nb_researchers_other_etp, $nb_post_phd_student_pp, $nb_post_phd_student_etp, $nb_phd_student_pp, $nb_phd_student_etp, $nb_cdi_researchers_pp,
             $nb_cdi_researchers_etp,$nb_cdd_researchers_pp, $nb_cdd_researchers_etp, $nb_teacher_researchers_pp, $nb_teacher_researchers_etp, $nb_pu_ph_pp, $nb_pu_ph_etp, $nb_hosp_others_pp,
             $nb_hosp_others_etp, $nb_ir_inserm_pp, $nb_ir_inserm_etp, $nb_ir_non_inserm_pp, $nb_ir_non_inserm_etp, $nb_ita_others_pp, $nb_ita_others_etp, $nb_cdd_ir_pp,
             $nb_cdd_ir_etp, $nb_cdd_others_pp, $nb_cdd_others_etp, $nb_admin_pp, $nb_admin_etp, $community) RETURNING id`,
    parameters: {
      structure_type: data[i].structure_type,
      iunop_code: data[i].iunop_code,
      code: data[i].code,
      name: data[i].name,
      number_of_certified_team: data[i].number_of_certified_team,
      regional_delegation: data[i].regional_delegation,
      site: data[i].site,
      street: data[i].street,
      address_supplement: data[i].address_supplement,
      postal_code: data[i].postal_code,
      city: data[i].city,
      country: data[i].country,
      director_lastname: data[i].director_lastname,
      director_firstname: data[i].director_firstname,
      director_email: data[i].director_email,
      email: data[i].email,
      dc_lastname: data[i].dc_lastname,
      dc_firstname: data[i].dc_firstname,
      dc_phone: data[i].dc_phone,
      dc_email: data[i].dc_email,
      mixt_university: data[i].mixt_university,
      cnrs_mixity: data[i].cnrs_mixity,
      other_mixity: data[i].other_mixity,
      principal_it: data[i].principal_it,
      specialized_commission: data[i].specialized_commission,
      total_etp_effectiv: data[i].total_etp_effectiv,
      nb_researchers_inserm_pp: data[i].nb_researchers_inserm_pp,
      nb_researchers_inserm_etp: data[i].nb_researchers_inserm_etp,
      nb_researchers_crns_pp: data[i].nb_researchers_crns_pp,
      nb_researchers_crns_etp: data[i].nb_researchers_crns_etp,
      nb_researchers_other_pp: data[i].nb_researchers_other_pp,
      nb_researchers_other_etp: data[i].nb_researchers_other_etp,
      nb_post_phd_student_pp: data[i].nb_post_phd_student_pp,
      nb_post_phd_student_etp: data[i].nb_post_phd_student_etp,
      nb_phd_student_pp: data[i].nb_phd_student_pp,
      nb_phd_student_etp: data[i].nb_phd_student_etp,
      nb_cdi_researchers_pp: data[i].nb_cdi_researchers_pp,
      nb_cdi_researchers_etp: data[i].nb_cdi_researchers_etp,
      nb_cdd_researchers_pp: data[i].nb_cdd_researchers_pp,
      nb_cdd_researchers_etp: data[i].nb_cdd_researchers_etp,
      nb_teacher_researchers_pp: data[i].nb_teacher_researchers_pp,
      nb_teacher_researchers_etp: data[i].nb_teacher_researchers_etp,
      nb_pu_ph_pp: data[i].nb_pu_ph_pp,
      nb_pu_ph_etp: data[i].nb_pu_ph_etp,
      nb_hosp_others_pp: data[i].nb_hosp_others_pp,
      nb_hosp_others_etp: data[i].nb_hosp_others_etp,
      nb_ir_inserm_pp: data[i].nb_ir_inserm_pp,
      nb_ir_inserm_etp: data[i].nb_ir_inserm_etp,
      nb_ir_non_inserm_pp: data[i].nb_ir_non_inserm_pp,
      nb_ir_non_inserm_etp: data[i].nb_ir_non_inserm_etp,
      nb_ita_others_pp: data[i].nb_ita_others_pp,
      nb_ita_others_etp: data[i].nb_ita_others_etp,
      nb_cdd_ir_pp: data[i].nb_cdd_ir_pp,
      nb_cdd_ir_etp: data[i].nb_cdd_ir_etp,
      nb_cdd_others_pp: data[i].nb_cdd_others_pp,
      nb_cdd_others_etp: data[i].nb_cdd_others_etp,
      nb_admin_pp: data[i].nb_admin_pp,
      nb_admin_etp: data[i].nb_admin_etp,
      community: data[i].community
    }
  });
  data[i].structure_id = structure[0].id;
  if (data[i].secondary_it && data[i].secondary_it[0] != "") {
    await importSecondaryData(data[i]);
  }
  i++;
  await importData(data, i);
}

async function importSecondaryData({ structure_id, secondary_it }) {
  const listInstitute = await pool.query({
    sql: `SELECT id, code FROM institute`,
    parameters: {}
  });
  for (let count = 0; count < secondary_it.length; count++) {
    if (secondary_it[count].length > 0) {
      const secondary = listInstitute.find(n => n.code === secondary_it[count]);
      if (secondary && secondary.id) {
        await pool.query({
          sql: `INSERT INTO secondary_it_structures(structure_id, institute_id) VALUES ($structure_id, $institute_id)`,
          parameters: {
            structure_id,
            institute_id: secondary.id
          }
        });
      }
    }
  }
}

async function fusionByCode(data, data2) {
  data2.forEach(element => {
    for (let i = 0; i < data.length; i++) {
      if (element.field1 == data[i].code) {
        data[i] = Object.assign({}, data[i], element);
      }
    }
  });
  return data;
}
