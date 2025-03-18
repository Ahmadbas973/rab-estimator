<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Bahan;
use App\Models\Upah;
use App\Models\Alat;
use App\Models\AhspDetail;
use App\Observers\BahanObserver;
use App\Observers\UpahObserver;
use App\Observers\AlatObserver;
use App\Observers\AhspDetailObserver;


class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Bahan::observe(BahanObserver::class);
        Upah::observe(UpahObserver::class);
        Alat::observe(AlatObserver::class);
        AhspDetail::observe(AhspDetailObserver::class);
    }
}
