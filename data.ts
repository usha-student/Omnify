
export interface Employee {
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
  }
  
  export const employees: Employee[] = [
    {
      firstName: 'John',
      middleName: 'S',
      lastName: 'Doe',
      fullName: 'John Doe'
    },
    {
      firstName: 'Jane',
      middleName: 'M',
      lastName: 'Smith',
      fullName: 'Jane Smith'
    },
    {
      firstName: 'Robert',
      middleName: 'J',
      lastName: 'Williams',
      fullName: 'Robert Williams'
    },
    {
      firstName: 'Lisa',
      middleName: 'K',
      lastName: 'Johnson',
      fullName: 'Lisa Johnson'
    }
  ];
  
  export const credentials = {
    username: 'Admin',
    password: 'admin123'
  };