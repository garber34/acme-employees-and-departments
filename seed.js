const { db, departments, employees } = require("./db");
const faker = require("faker");

const fakeDepartments = [];
while (fakeDepartments.length - 1 < 4) {
  const fakeDep = faker.name.jobArea();

  //check for department name uniqueness
  if (!fakeDepartments.includesfakeDep) fakeDepartments.push({ name: fakeDep });
}

const fakeEmployees = [];

for (let x = 0; x < 50; x++) {
  fakeEmployees.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    departmentId: faker.random.number({ min: 1, max: 5 }),
  });
}

async function syncAndSeed() {
  await db.sync({ force: true });
  await departments.bulkCreate(fakeDepartments);
  await employees.bulkCreate(fakeEmployees);
  await db.close();
}

syncAndSeed();
