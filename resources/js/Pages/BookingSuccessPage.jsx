import React from 'react';
import Layout from '../Layouts/GenericLayout';
import { usePage } from '@inertiajs/react';

const BookingSuccessPage = () => {
    const { reservation } = usePage().props;

    return (
        <Layout>
            <section id="booking-success" className="py-5 text-center">
                <div className="container col-md-6 shadow p-5 rounded bg-light">
                    {reservation ? (
                        <>
                            <h2 className="text-success fw-bold">Reservation Successful!</h2>
                            <p className="lead">Thank you, <strong>{reservation.name}</strong>, for booking with us.</p>
                            <p>You will receive a confirmation email shortly at <strong>{reservation.email}</strong></p>

                            <div className="alert alert-info">
                                <h4>Your Booking Details</h4>
                                <p><strong>Reference Code:</strong> {reservation.referenceCode}</p>
                                <p><strong>Date:</strong> {reservation.reservationDate}</p>
                                <p><strong>Time:</strong> {reservation.reservationTime}</p>
                                <p><strong>Guests:</strong> {reservation.numGuests}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-danger fw-bold">No Reservation Found!</h2>
                            <p className="lead">There was an issue retrieving your booking details.</p>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BookingSuccessPage;
