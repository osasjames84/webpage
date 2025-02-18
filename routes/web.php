<?php

use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\BookingReservationController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SpecialMealsController;
use App\Http\Controllers\WhyPeopleChooseUsController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\ReviewsController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\SuperAdmin\PermissionController;
use App\Http\Controllers\SuperAdmin\UserPermissionController;
use App\Http\Controllers\SuperAdmin\RoleController;

// make sure all url's are lower case & they can have a space in them
// for example the url /booking page       this is valid 
// this makes sure all our ur's work with out search bar

// Route for fetching special meals
Route::get('/api/special-meals', [SpecialMealsController::class, 'getSpecialMeals']);
// Route for fetching cuisines
Route::get('/api/cuisines', [WhyPeopleChooseUsController::class, 'getCuisines']);


// route to the submite review page
Route::get('/submitReview', function () {
    return Inertia('SubmitReview');
});
// route to send review to db
Route::post('/post/submitReview', [ReviewController::class, 'SubmitReview']);

// logout user route
// no page just connected to the dropdown option
Route::post('/logoutUser', function () {
    Auth::logout(); // logout user
});

// register user page route
Route::get('/registerUser', function () {
    return inertia('RegisterPage');
});
// route the POST works over
Route::post('/post/registerUser', [RegisterController::class, 'store']);

// login page route
Route::get('/loginUser', function () {
    return inertia('LoginPage');
});
// login the user
Route::post('/loginUser', [LoginController::class, 'login'])->name('loginUser');
// used to see if the user is logged in
Route::get('/loginUser', [LoginController::class, 'loggedInCheck']);

// home page route
Route::get('/home', function () {
    return inertia('HomePage');
});

//get chicken route
Route::get('/chicken', function () {
    return inertia('Chicken');
});
// route to get the reviews from the db
Route::get('/get/reviews', [ReviewController::class, 'pickReviews'])->name('home');

// Booking Reservation Page Route
Route::get('/booking', function () {
    return inertia('BookingReservationPage');
});

Route::post('/booking', [BookingReservationController::class, 'store']);

// About Page
Route::get('/about', function () {
    return inertia('about');
});

// Contact Page
Route::get('/contact-us', function () {
    return inertia('contact-us');
});

// Faqs
Route::get('/faqs', function () {
    return inertia('faqs');
});

// Privacy
Route::get('/privacy-policy', function () {
    return inertia('privacy-policy');
});

// route to get the menu items from target db table
Route::get('/menu/{menuType}', [MenuController::class, 'getMenuItems']);
// morning menu page
Route::get('/morningMenu', function () {
    return Inertia('MorningMenu');
});
// evening menu page
Route::get('/eveningMenu', function () {
    return Inertia('EveningMenu');
});
// evening menu page
Route::get('/kidsMenu', function () {
    return Inertia('KidsMenu');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'role:Admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::middleware('permission:manage-faqs')->group(function () {
        Route::get('/faqs', [FaqController::class, 'index'])->name('admin.faqs.index');
        Route::get('/faqs/{faq}/edit', [FaqController::class, 'edit'])->name('admin.faqs.edit');
        Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('admin.faqs.update');
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('admin.faqs.destroy');
        Route::patch('/faqs/reorder', [FaqController::class, 'updateOrder'])->name('admin.faqs.reorder');
    });

    Route::middleware('permission:create-faqs')->group(function () {
        Route::get('/faqs/create', [FaqController::class, 'create'])->name('admin.faqs.create');
        Route::post('/faqs', [FaqController::class, 'store'])->name('admin.faqs.store');
    });
    Route::middleware('permission:manage-reviews')->group(function () {
        Route::get('/manage-reviews', [ReviewsController::class, 'index'])->name('admin.reviews.index');
        Route::get('/manage-reviews/{review}/edit', [ReviewsController::class, 'edit'])->name('admin.reviews.edit');
        Route::put('/manage-reviews/{review}', [ReviewsController::class, 'update'])->name('admin.reviews.update');
        Route::delete('/manage-reviews/{review}', [ReviewsController::class, 'destroy'])->name('admin.reviews.destroy');
    });
    //manage-messages
    Route::middleware('permission:manage-contact-us-messages')->group(function () {
        Route::get('/messages', [ContactMessageController::class, 'index'])->name('admin.messages');
        Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy'])->name('admin.messages.destroy');
        Route::patch('/messages/{id}/mark-read', [ContactMessageController::class, 'markAsRead'])->name('admin.messages.mark-read');

    });
    Route::middleware('permission:manage-members')->group(function () {
        Route::get('/members', [MemberController::class, 'index'])->name('admin.members.index');
        Route::delete('/members/{user}', [MemberController::class, 'destroy'])->name('admin.members.destroy');
        Route::put('/members/{member}', [MemberController::class, 'update'])->name('admin.members.update');
    });
    Route::middleware('permission:manage-menu-items')->group(function () {
        Route::get('/manage-menu/{menuType?}', [MenuController::class, 'menuItems'])->name('admin.manage-menu');
        Route::delete('/manage-menu/{menuType}/{item}', [MenuController::class, 'delete'])->name('admin.manage-menu.delete');
        Route::get('/manage-menu/{menuType}/{item}/edit', [MenuController::class, 'edit'])->name('admin.manage-menu.edit');
        Route::put('/manage-menu/{menuType}/{item}', [MenuController::class, 'update'])->name('admin.manage-menu.update');
    });

    Route::middleware('permission:create-menu-items')->group(function () {
        Route::get('/menu/create/item', [MenuController::class, 'showCreatePage'])->name('admin.manage-menu.create');
        Route::post('/menu/create/item/post', [MenuController::class, 'submitMenuItem'])->name('admin.manage-menu.submit');
    });
});

// Routes accessible without authentication
Route::prefix('admin')->group(function () {
    Route::get('/', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/create', [AdminAuthController::class, 'createAdmin'])->name('admin.create');
    Route::get('/register', function () {
        return Inertia::render('Admin/Register');
    })->name('admin.register');
});

// Routes requiring admin authentication
Route::middleware(['web', 'auth:admin'])->prefix('admin')->group(function () {

    Route::middleware('permission:manage-reviews')->group(function () {
        Route::get('/manage-reviews', [ReviewsController::class, 'index'])->name('admin.reviews.index');
        Route::get('/manage-reviews/{review}/edit', [ReviewsController::class, 'edit'])->name('admin.reviews.edit');
        Route::put('/manage-reviews/{review}', [ReviewsController::class, 'update'])->name('admin.reviews.update');
        Route::delete('/manage-reviews/{review}', [ReviewsController::class, 'destroy'])->name('admin.reviews.destroy');
    });
    //manage-messages
    Route::middleware('permission:manage-contact-us-messages')->group(function () {
        Route::get('/messages', [ContactMessageController::class, 'index'])->name('admin.messages');
        Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy'])->name('admin.messages.destroy');
        Route::patch('/messages/{id}/mark-read', [ContactMessageController::class, 'markAsRead'])->name('admin.messages.mark-read');

    });

    Route::middleware('permission:manage-members')->group(function () {
        Route::get('/members', [MemberController::class, 'index'])->name('admin.members.index');
        Route::delete('/members/{user}', [MemberController::class, 'destroy'])->name('admin.members.destroy');
        Route::put('/members/{member}', [MemberController::class, 'update'])->name('admin.members.update');
    });



    // menu related routes

    Route::middleware('permission:manage-menu-items')->group(function () {
        Route::get('/manage-menu/{menuType?}', [MenuController::class, 'menuItems'])->name('admin.manage-menu');
        Route::delete('/manage-menu/{menuType}/{item}', [MenuController::class, 'delete'])->name('admin.manage-menu.delete');
        Route::get('/manage-menu/{menuType}/{item}/edit', [MenuController::class, 'edit'])->name('admin.manage-menu.edit');
        Route::put('/manage-menu/{menuType}/{item}', [MenuController::class, 'update'])->name('admin.manage-menu.update');


    });

    Route::middleware('permission:create-menu-items')->group(function () {
        Route::get('/menu/create/item', [MenuController::class, 'showCreatePage'])->name('admin.manage-menu.create');
        Route::post('/menu/create/item/post', [MenuController::class, 'submitMenuItem'])->name('admin.manage-menu.submit');
    });



    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
    Route::get('/dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/manage-reviews', [ReviewsController::class, 'index'])->name('admin.reviews.index');
    Route::get('/manage-reviews/{review}/edit', [ReviewsController::class, 'edit'])->name('admin.reviews.edit');
    Route::put('/manage-reviews/{review}', [ReviewsController::class, 'update'])->name('admin.reviews.update');
    Route::delete('/manage-reviews/{review}', [ReviewsController::class, 'destroy'])->name('admin.reviews.destroy');
    Route::get('/messages', [ContactMessageController::class, 'index'])->name('admin.messages');
    Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy'])->name('admin.messages.destroy');
    Route::patch('/messages/{id}/mark-read', [ContactMessageController::class, 'markAsRead'])->name('admin.messages.mark-read');

    // Menu related routes
    Route::get('/manage-menu/{menuType?}', [MenuController::class, 'menuItems'])->name('admin.manage-menu');
    Route::delete('/manage-menu/{menuType}/{item}', [MenuController::class, 'delete'])->name('admin.manage-menu.delete');
    Route::get('/manage-menu/{menuType}/{item}/edit', [MenuController::class, 'edit'])->name('admin.manage-menu.edit');
    Route::put('/manage-menu/{menuType}/{item}', [MenuController::class, 'update'])->name('admin.manage-menu.update');

    // inventory related routes
    Route::get('/inventory', [InventoryController::class, 'inventoryPage'])->name('admin.inventory');
});


Route::middleware(['auth', 'role:Super Admin'])->prefix('super-admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('super-admin.dashboard');
    Route::get('/manage-roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/manage-roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/manage-roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/manage-roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    Route::get('/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
    Route::get('/assign-permission', [UserPermissionController::class, 'index'])->name('home');
    Route::post('/assign-permission', [UserPermissionController::class, 'assignPermission'])->name('assign.permission');
    Route::post('/revoke-permission', [UserPermissionController::class, 'revokePermission'])->name('permissions.revoke');
});


require __DIR__ . '/auth.php';