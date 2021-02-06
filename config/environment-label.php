<?php

return [

    'showLabel' => true,
    'labelText' => ' (' . CRAFT_ENVIRONMENT . ')',
    'prefixText' => getenv('CRAFT_ENV_LABEL_PREFIX'),
    'suffixText' => null,
    'labelColor' => getenv('CRAFT_ENV_LABEL_COLOR'),
    'textColor' => getenv('CRAFT_ENV_LABEL_TEXT_COLOR'),
    'targetSelector' => '#global-header:before',

];