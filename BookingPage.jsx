import React, { useState } from "react";
import "./BookingPage.css";
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const [step, setStep] = useState("select");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();
  const movie = location.state?.movie;

  // ✅ Payment states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    booked: false,
  }));

  const toggleSeat = (seat) => {
    if (seat.booked) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id],
    );
  };

  const totalPrice = selectedSeats.length * 200;

  // ✅ Validation function
  const validatePayment = () => {
    let newErrors = {};

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Enter valid 16-digit card number";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Enter valid expiry (MM/YY)";
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "Enter valid 3-digit CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ CANCEL FUNCTION (ADDED)
  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this ticket?",
    );

    if (confirmCancel) {
      setSelectedSeats([]);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setErrors({});
      setStep("select");
      alert("Ticket cancelled successfully ❌");
    }
  };

  return (
    <div className="booking-container">
      {/* 🎬 MOVIE HEADER */}
      {movie && (
        <div className="movie-banner">
          <img
            src={`https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title}
            className="banner-img"
          />

          <div className="banner-overlay">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="banner-poster"
            />

            <div className="banner-text">
              <h1>{movie.title}</h1>
              <p>{movie.release_date}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🎬 Seat Selection */}
      {step === "select" && (
        <>
          <div className="screen">SCREEN</div>

          <div className="seat-grid">
            {seats.map((seat) => (
              <div
                key={seat.id}
                onClick={() => toggleSeat(seat)}
                className={`seat 
                  ${seat.booked ? "booked" : "available"} 
                  ${selectedSeats.includes(seat.id) ? "selected" : ""}
                `}
              >
                {seat.id}
              </div>
            ))}
          </div>

          <div className="booking-info">
            <p>
              <strong>Selected:</strong> {selectedSeats.join(", ") || "None"}
            </p>
            <p>
              <strong>Total:</strong> ₹{totalPrice}
            </p>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => setStep("payment")}
            className="book-btn"
          >
            Proceed to Payment
          </button>
        </>
      )}

      {/* 💳 Payment */}
      {step === "payment" && (
        <div className="payment-box">
          <h2>💳 Please Do Payment</h2>

          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          {errors.expiry && <p className="error">{errors.expiry}</p>}

          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}

          <button
            onClick={() => {
              if (validatePayment()) {
                setStep("success");
              }
            }}
            className="book-btn"
          >
            Pay ₹{totalPrice}
          </button>
        </div>
      )}

      {/* ✅ SUCCESS */}
      {step === "success" && (
        <div className="ticket-wrapper">
          <div className="ticket-card">
            <h2 className="ticket-title">✅ Booking Confirmed</h2>

            {movie && (
              <div className="ticket-movie">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            )}

            <div className="ticket-info">
              <p>
                <strong>Seats:</strong> {selectedSeats.join(", ")}
              </p>
              <p>
                <strong>Total Paid:</strong> ₹{totalPrice}
              </p>
              <p>
                <strong>Status:</strong> Confirmed
              </p>
            </div>

            {/* ❌ CANCEL BUTTON (ADDED HERE) */}
            <button className="cancel-btn" onClick={handleCancel}>
              ❌ Cancel Ticket
            </button>

            <button
              className="ticket-btn"
              onClick={() => (window.location.href = "/")}
            >
              🔙 Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
