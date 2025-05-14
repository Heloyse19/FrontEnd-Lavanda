'use client'
import React from 'react';

const laundriesData = [
  {
    id: 1,
    name: 'Lavanderia OMO',
    address: 'Rua das Flores, 123',
    phone: '(11) 1234-5678',
    image: '/imgs/lavanderia.png'
  },
  {
    id: 2,
    name: 'Lavanderia ALA',
    address: 'Av. Paulista, 1000',
    phone: '(11) 9876-5432',
    image: 'imgs/sabaoala.jpg'
  },
  {
    id: 3,
    name: 'Lavanderia bem-te-vi',
    address: 'Rua Brasil, 45',
    phone: '(11) 2468-1357',
    image: 'imgs/bemtevi.png'
  },
  {
    id: 4,
    name: 'Lavanderia Vanish',
    address: 'Praça Sete, 321',
    phone: '(11) 1357-2468',
    image: 'imgs/vanish.jpeg'
  }
];

export default function Laundries() {
  return (
    <>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f7f9fc;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 2.5rem;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          background: white;
          padding: 15px 25px;
          border-radius: 10px;
          margin-bottom: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: box-shadow 0.3s ease;
        }
        li:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .img-wrapper {
          flex-shrink: 0;
        }
        .img-wrapper img {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        .name {
          font-weight: 700;
          font-size: 1.4rem;
          color: #34495e;
          margin-bottom: 6px;
        }
        .address, .phone {
          color: #7f8c8d;
          font-size: 1rem;
          line-height: 1.4;
        }
      `}</style>
      <div className="container">
        <h1>Lavanderias</h1>
        <ul>
          {laundriesData.map(({ id, name, address, phone, image }) => (
            <li key={id}>
              <div className="img-wrapper">
                <img src={image} alt={name} />
              </div>
              <div className="info">
                <span className="name">{name}</span>
                <span className="address">{address}</span>
                <span className="phone">{phone}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

