import { useState } from 'react';

const PlaygroundDocs = () => {
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

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={() => increment()}>Increase count</button>
      <span>{count}</span>
    </>
  );
};

export default PlaygroundDocs;
