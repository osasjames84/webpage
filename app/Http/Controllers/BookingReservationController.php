<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class BookingReservationController extends Controller{

    private function generateReferenceCode()
    {
        do {
            $code = strtoupper(uniqid('RES-'));
        } while (Reservations::where('referenceCode', $code)->exists());

        return $code;
    }

    public function store(Request $request) {

        // Log the incoming request data
        Log::info('Booking Data:', $request->all());

        // validates the data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'reservationDate' => 'required|date|after_or_equal:today',
            'reservationTime' => 'required|date_format:H:i',
            'numGuests' => 'required|integer|min:1|max:20',
            'specialRequest' => 'nullable|string',
            'phoneNumber' => 'required|digits:11',
            'email' => 'required|email|max:255',

        ]);

        // Creates the booking
        Reservations::create([
            'name' => $validatedData['name'],
            'reservationDate' => $validatedData['reservationDate'],
            'reservationTime' => $validatedData['reservationTime'],
            'numGuests' => $validatedData['numGuests'],
            'specialRequests' => $validatedData['specialRequest'] ?? null,
            'phoneNumber' => $validatedData['phoneNumber'],
            'email' => $validatedData['email'],
            'referenceCode' => $this->generateReferenceCode(),
        ]);

        // Redirect Message
        return redirect()->back()->with('message', 'Your Booking Was Successful');
    }
}