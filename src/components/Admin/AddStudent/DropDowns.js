function BatchOptions() {
  const currentYear = new Date().getFullYear();
  const options = [];

  for (let i = 0; i < 7; i++) {
    const year = currentYear - i;
    const faBatch = `FA${year.toString().substring(2)}`;
    const spBatch = `SP${year.toString().substring(2)}`;

    options.push(faBatch);
    options.push(spBatch);
  }

  return options;
}
const DepartmentOptions = [
  "BAF",
  "BAI",
  "BAR",
  "BBA",
  "BCE",
  "BCS",
  "BDE",
  "BEC",
  "BEE",
  "BEN",
  "BID",
  "BMC",
  "BPH",
  "BPY",
  "BSE",
  "BSM",
  "BST",
  "CHE",
  "PCH",
  "PCS",
  "PEE",
  "PHM",
  "PMS",
  "PMT",
  "PPC",
  "PPH",
  "PST",
  "R06",
  "RBA",
  "RCH",
  "RCP",
  "RCS",
  "REC",
  "REE",
  "REL",
  "RMS",
  "RMT",
  "RNE",
  "RPH",
  "RPM",
  "RPY",
  "RST",
];
const semesters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const Section = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const Status = ["Enrolled", "Freeze", "Graduated", "Dropped"];

module.exports = {
  BatchOptions,
  DepartmentOptions,
  semesters,
  Section,
  Status,
};
