import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { updateUser } from "../../utilities/users-api";

export default function ItineraryPageThree({ user }) {
  const [exhibitions, setExhibitions] = useState([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [chosenDate, setChosenDate] = useState();
  const [chosenAccessibility, setChosenAccessibility] = useState();
  const [chosenDuration, setChosenDuration] = useState();

  const fetchQuery = async () => {
    try {
      const response = await fetch(
        `/exhibition/search?accessibility=${chosenAccessibility}&date=${chosenDate}`
      );
      const data = await response.json();
      setExhibitions(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleFetch = (evt) => {
    fetchQuery();
    console.log("this test", testArray);
  };

  const testArray = exhibitions.map((exhibit, index) => {
    return exhibit._id;
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  //   getRandomIntInclusive(0,exhibitions.length -1)

  const getRandomNumbersWithoutRepeat = (min, max, count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      const number = getRandomIntInclusive(min, max);
      numbers.add(number);
    }
    return Array.from(numbers);
  };

  const handleCheckboxChange = (card) => {
    setSelectedCard((prevSelectedCards) => {
      if (prevSelectedCards.find((c) => c._id === card._id)) {
        return prevSelectedCards.filter((c) => c._id !== card._id);
      } else {
        return [...prevSelectedCards, card];
      }
    });
  };

  const handlePatchButtonClick = async () => {
    try {
      const userId = user._id;
      console.log("User ID:", userId);
      const itinerary = selectedCard.map((card) => ({
        selectedCardId: card._id,
        selectedCardTitle: card.title || "Untitled",
        dateOfVisit: new Date(), // Assign the current date as the date of visit
      }));
      console.log("Itinerary:", itinerary);
      const requestBody = {
        id: userId,
        itinerary,
      };
      const updatedUser = await updateUser(userId, requestBody);
      console.log("User updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDate = (evt) => {
    setChosenDate(evt.target.value);
  };

  const handleAccessibility = (evt) => {
    setChosenAccessibility(evt.target.value);
  };

  const handleDuration = (evt) => {
    setChosenDuration(evt.target.value);
  };

  return (
    <div className="page-container">
      <h1>Welcome {user.name}!</h1>

      <section className="section-container">
        <img
          src="https://www.nationalgallery.sg/sites/default/files/ng-journeys-img-01.jpg"
          alt="Pondering Guest"
        />
      </section>

      <section className="section-container">
        <h3>Select your Visit Date!</h3>
        <input type="date" id="start" name="trip-start" onChange={handleDate} />
      </section>

      <section className="section-container">
        <h3>Select A Ticket Type</h3>
        <select
          name="visitorTypes"
          id="types-select"
          onChange={handleAccessibility}
        >
          <option value={chosenAccessibility}>Visitor Types</option>
          <option value="FOR ALL">For All</option>
          <option value="ADULTS">Adults</option>
          <option value="CHILDREN">Children</option>
          <option value="FAMILIES">Families</option>
          <option value="SENIORS">Seniors</option>
          <option value="SPECIAL NEEDS">Special Needs</option>
          <option value="STUDENTS">Students</option>
          <option value="TEACHERS">Teachers</option>
        </select>
      </section>

      <section className="section-container">
        <h3>Select Duration Of Visit</h3>
        <select
          name="durationTypes"
          id="types-select"
          onChange={handleDuration}
        >
          <option value={chosenDuration}>Duration Types</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="5">5 hours</option>
          <option value="9">Full day</option>
        </select>
      </section>

      <section className="section-container">
        {/* {getRandomIntInclusive(0,exhibitions.length -1)} */}
        {getRandomNumbersWithoutRepeat(1, 10, 5).join(", ")}
        <button onClick={handleFetch}>Show me available exhibitions</button>
      </section>

      <section className="section-container">
        {isLoading ? (
          <div></div>
        ) : (
          exhibitions.map((exhibition) => (
            <div key={exhibition._id}>
              <Card card={exhibition} />
              <input
                type="checkbox"
                checked={selectedCard.some(
                  (card) => card._id === exhibition._id
                )}
                onChange={() => handleCheckboxChange(exhibition)}
              />
            </div>
          ))
        )}
      </section>

      {selectedCard.length > 0 && (
        <p>
          Selected Exhibitions:{" "}
          {selectedCard.map((card) => card.title || "Untitled").join(", ")}
        </p>
      )}

      <button onClick={handlePatchButtonClick}>Patch User</button>
    </div>
  );
}
