<?php

require('common/config.php');
require('common/error.php');

if (isset($_COOKIE["user"]) {
    echo 'isset'.$_COOKIE["user"];
} else {
    echo 'nosset';
}

?>
