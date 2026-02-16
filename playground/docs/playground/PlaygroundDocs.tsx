import { Table } from 'lib/components';
import { TableColumn } from 'lib/components/table/Table.d';

const PlaygroundDocs: React.FC = () => {
  //   const users = [
  //     { name: 'Jotaro', age: '30', isAdmin: true },
  //     { name: 'Johan', age: 20, isAdmin: false },
  //     // Asumsikan ada user lainnya, tidak hanya 2
  //   ];

  //   const createCardList = () => {
  //     return users.map((each) => {
  //       return (
  //         <li key={each.name}>
  //           <UserCard {...each} />
  //         </li>
  //       );
  //     });
  //   };

  //   return <ul className="flex flex-col gap-1">{createCardList()}</ul>;// Langsung di Vue method atau mounted

  //   console.log(navigator.userAgent);
  //   const successCallback = (pos) => {
  //     const lat = pos.coords.latitude;
  //     const lng = pos.coords.longitude;
  //     const accuracy = pos.coords.accuracy;

  //     console.log(`Latitude: ${lat}, Longitude: ${lng}, Accuracy: ${accuracy}m`);

  //     if (accuracy > 100) {
  //       console.log('Fake GPS terdeteksi. Harap matikan aplikasi fake GPS.');
  //     } else {
  //       console.log('null');
  //       // Kirim ke backend Go untuk validasi lanjut
  //       console.log('lat, lng, accuracy', lat, lng, accuracy);
  //     }
  //   };

  //   const errorCallback = (err) => {
  //     if (err.code === err.PERMISSION_DENIED) {
  //       console.log('GPS mati atau tidak diizinkan.');
  //     } else if (err.code === err.POSITION_UNAVAILABLE) {
  //       console.log('Lokasi tidak tersedia.');
  //     } else if (err.code === err.TIMEOUT) {
  //       console.log('Timeout mendapatkan lokasi.');
  //     } else {
  //       console.log('Error tidak diketahui.');
  //     }
  //   };

  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   });

  // const [count, setCount] = useState(0);

  // const increment = () => {
  //   setCount(count + 1);
  // };

  // return (
  //   <>
  //     <button onClick={() => increment()}>Increase count</button>
  //     <span>{count}</span>
  //   </>
  // );

  type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    role: 'Admin' | 'User' | 'Guest';
  };

  const columns: TableColumn<User>[] = [
    { field: 'name', dataType: 'string', header: 'Name' },
    { field: 'email', dataType: 'string', header: 'Email' },
    { field: 'age', dataType: 'number', header: 'Age' },
    { field: 'role', dataType: 'string', header: 'Role' },
  ];

  const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@mail.com', age: 25, role: 'Admin' },
    { id: '2', name: 'Bob', email: 'bob@mail.com', age: 30, role: 'User' },
    {
      id: '3',
      name: 'Charlie',
      email: 'charlie@mail.com',
      age: 28,
      role: 'User',
    },
    { id: '4', name: 'David', email: 'david@mail.com', age: 35, role: 'Admin' },
    { id: '5', name: 'Eve', email: 'eve@mail.com', age: 27, role: 'Guest' },
    { id: '6', name: 'Frank', email: 'frank@mail.com', age: 32, role: 'User' },
    { id: '7', name: 'Grace', email: 'grace@mail.com', age: 29, role: 'User' },
    {
      id: '8',
      name: 'Hannah',
      email: 'hannah@mail.com',
      age: 24,
      role: 'Guest',
    },
    { id: '9', name: 'Ivan', email: 'ivan@mail.com', age: 31, role: 'Admin' },
    { id: '10', name: 'Judy', email: 'judy@mail.com', age: 26, role: 'User' },
    { id: '11', name: 'Ken', email: 'ken@mail.com', age: 34, role: 'User' },
  ];

  return (
    <div className="w-[800px]">
      <Table<User>
        columns={columns}
        data={users}
        mode="paginate"
        selectionMode="multi"
      />
    </div>
  );
};

export default PlaygroundDocs;
