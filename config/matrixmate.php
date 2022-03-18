<?php

return [
    'fields' => [
        'matrixFieldHandle' => [
            'groups' => [[
                'label' => 'Content',
                'types' => ['text', 'images', 'video'],
            ], [
                'label' => 'Listings',
                'types' => ['news', 'employees'],
            ]],
            'types' => [
                'text' => [
                    'tabs' => [[
                        'label' => 'Text',
                        'fields' => ['heading', 'text'],
                    ], [
                        'label' => 'Settings',
                        'fields' => ['columns'],
                    ]],
                    'hiddenFields' => ['backgroundColor', 'textColor'],
                ],
                'news' => [
                    'maxLimit' => 1,
                ],
            ],
        ],
        'anotherMatrixFieldHandle' => [
            ...
        ],
    ],
];