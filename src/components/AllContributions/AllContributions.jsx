import React, { useState, useEffect } from "react";
import axios from "axios";

const AllContributions = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMatch, setNoMatch] = useState(false); // حالة عدم وجود نتيجة مطابقة

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = `shahd__${localStorage.getItem('token')}`;
        const headers = { token };       
        const { data } = await axios.get("https://spotless-moth-rugby-shirt.cyclic.app/api/v1/contribution/", { headers });
        setPlants(data.contribution);
        setFilteredPlants(data.contribution);
        console.log("الداتا تاعت المساهمات99999", data)
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // البحث في اسم النبات بالعربي أو بالإنجليزي
    const results = plants.filter(
      (plant) =>
        plant.ArabicName.toLowerCase().includes(searchTerm) ||
        plant.EnglishName.toLowerCase().includes(searchTerm)
    );

    setFilteredPlants(results);

    // تحديث حالة عدم وجود النتيجة المطابقة
    const isCharNotFound = results.every(
      (plant) =>
        !plant.ArabicName.toLowerCase().includes(searchTerm) &&
        !plant.EnglishName.toLowerCase().includes(searchTerm)
    );

    setNoMatch(isCharNotFound && searchTerm !== "");
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h1
        className="text-4xl font-bold mb-9"
        style={{ textShadow: "2px 5px 4px rgba(0, 0, 0, 0.4)" }}
      >
        المساهمات
      </h1>
      
      <div className="w-full mb-8">
        <input
          type="text"
          placeholder="... ابحث عن نبات"
          className="w-1/2 border-black p-3 pl-10 m-auto rounded-md border focus:outline-none text-right"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="bg-green-800 text-white py-3 ms-3 px-4 rounded-md">
          <a
            href="/usercontribution"
            style={{ textDecoration: "none", color: "white" }}
          >
            اضافة مساهمة
          </a>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {noMatch && (
        <div className="col-span-1 lg:col-span-3 flex justify-center items-center h-48">
          <p className="text-red-700 font-semibold text-center text-3xl">
          لا يوجد نبات يطابق بحثك
          </p>
        </div>
        )}

        {filteredPlants.map((plant, index) => (
          <div
            key={plant._id}
            className="bg-white p-6 rounded-md shadow-md text-right border-1 border-black"
          >
            <div className="flex items-center mb-2">
              <img
                src="./images/plantLogo.jpg"
                alt="plant Logo"
                className="w-8 h-8 object-cover rounded-full mr-2"
              />
              <p className="text-lg text-gray-600 mb-2">
              {plant.createdBy ? plant.createdBy.userName : 'Unknown User'}
              </p>
            </div>

            <h2 className="text-xl font-semibold mb-2">{plant.ArabicName}</h2>
            <p className="text-xl font-semibold mb-2">{plant.EnglishName}</p>
            <img
              src={plant.image}
              alt={plant.ArabicName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContributions;





