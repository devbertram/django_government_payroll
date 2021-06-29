let mix = require('laravel-mix');

mix.setPublicPath('../static').js('src/js/components/Authentication/LoginFormMainComp.js', 'static/build/js/Authentication').react();
mix.setPublicPath('../static').js('src/js/components/Utils/FullPageLoaderComp.js', 'static/build/js/Utils').react();
mix.setPublicPath('../static').js('src/js/components/Utils/ToastNotificationComp.js', 'static/build/js/Utils').react();
mix.setPublicPath('../static').js('src/js/components/BaseDashboard/DashboardMain.js', 'static/build/js/BaseDashboard').react();

mix.disableSuccessNotifications();