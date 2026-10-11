let cats = [
  {
    cat_id: 1,
    name: 'jo',
    birthdate: '2022-05-10',
    weight: 3.5,
    owner: 'jojo',
    image:
      'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
];
export const getAll = () => cats;
export const getById = (id) => cats.find((cat) => cat.cat_id === id);
export const add = (catData) => {
  const newId =
    cats.length > 0 ? Math.max(...cats.map((cat) => cat.cat_id)) + 1 : 1;
  const newCat = {cat_id: newId, ...catData};
  cats.push(newCat);
  return newCat;
};
