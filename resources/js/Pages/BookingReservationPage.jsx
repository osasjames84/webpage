import React, { useState, useEffect } from 'react';
import Layout from '../Layouts/GenericLayout';
import { Inertia } from '@inertiajs/inertia';

const BookingReservationPage = ({ message }) => {
    const [timer, setTimer] = useState(900);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        specialRequest: ''
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        // Form timer countdown
        if (timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            alert('Time expired! Please try reserving again.');
            resetForm();
        }
    }, [timer]);

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: '',
            specialRequest: ''
        });
        setFormErrors({});
        setTimer(900);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const getTimerColor = () => {
        if (timer > 300) return 'green';
        if (timer > 60) return 'orange';
        return 'red';
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required.';
        if (!formData.email) errors.email = 'Email is required.';
        if (!formData.phone) errors.phone = 'Phone number is required.';
        if (!formData.date) errors.date = 'Date is required.';
        if (!formData.time) errors.time = 'Time slot is required.';
        if (!formData.guests) errors.guests = 'Number of guests is required.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            name: formData.name,
            reservationDate: formData.date,
            reservationTime: formData.time,
            numGuests: formData.guests,
            specialRequests: formData.specialRequest,
            phoneNumber: formData.phone,
            email: formData.email,
        };

        Inertia.post('/booking', payload, {
            onSuccess: (response) => {
                alert(response.props.message || 'Your table has been reserved.');
                resetForm();
            },
            onError: (errors) => {
                setFormErrors(errors);
            }
        });
    };

    const groupTimeSlots = () => {
        const start = 9 * 60; // 9:00 AM in minutes
        const end = 20 * 60; // 8:00 PM in minutes
        const interval = 15; // 15-minute intervals
        const slots = [];

        for (let time = start; time <= end; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

            if (hours < 12) {
                slots.push({ group: 'Morning', time: formattedTime });
            } else if (hours < 17) {
                slots.push({ group: 'Afternoon', time: formattedTime });
            } else {
                slots.push({ group: 'Evening', time: formattedTime });
            }
        }

        return slots;
    };

    const timeSlotGroups = groupTimeSlots().reduce((groups, slot) => {
        if (!groups[slot.group]) groups[slot.group] = [];
        groups[slot.group].push(slot.time);
        return groups;
    }, {});

    return (
        <Layout>
            <section id="booking-section" className="py-5">
                <div className="container col-xxl-8 px-4 py-5">
                    <div className={`timer-display text-center mb-4 ${getTimerColor()}`}>
                        <h3>Time left to complete your booking: {formatTime(timer)}</h3>
                        <div className="progress mt-2">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${(timer / 900) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <h2 className="display-6 fw-bold text-body-emphasis mb-3">Book Your Table</h2>
                    <p className="lead">Reserve a table at La Dolce Vita and enjoy an unforgettable dining experience!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            />
                            {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            />
                            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Phone</label>
                            <div className="input-group">
                                <span className="input-group-text">+44</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    pattern="[0-9]{11}"
                                    placeholder="07512399932"
                                    onChange={handleChange}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                                    value={formData.phone}
                                    className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                />
                            </div>
                            {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={formData.date}
                                className={`form-control ${formErrors.date ? 'is-invalid' : ''}`}
                            />
                            {formErrors.date && <div className="text-danger">{formErrors.date}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Select a Time Slot</label>
                            {Object.keys(timeSlotGroups).map((group) => (
                                <div key={group}>
                                    <h4>{group}</h4>
                                    <div className="d-flex flex-wrap gap-2">
                                        {timeSlotGroups[group].map((slot, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    handleChange({ target: { name: 'time', value: slot } })
                                                }
                                                className={`btn ${
                                                    formData.time === slot ? 'btn-success' : 'btn-outline-primary'
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {formErrors.time && <div className="text-danger">{formErrors.time}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Guests</label>
                            <input
                                type="number"
                                name="guests"
                                onChange={handleChange}
                                value={formData.guests}
                                className={`form-control ${formErrors.guests ? 'is-invalid' : ''}`}
                            />
                            {formErrors.guests && <div className="text-danger">{formErrors.guests}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Special Request</label>
                            <textarea
                                name="specialRequest"
                                onChange={handleChange}
                                value={formData.specialRequest}
                                className="form-control"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Reserve Table</button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default BookingReservationPage;
