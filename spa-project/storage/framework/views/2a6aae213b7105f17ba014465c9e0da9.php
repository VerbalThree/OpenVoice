<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My SPA</title>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
</head>
<body>
    <div id="app">
    <router-view></router-view>
    </div>    
</body>
</html><?php /**PATH /home/felipe/Desktop/spa-project/resources/views/app.blade.php ENDPATH**/ ?>