<?php

$globalConfig = [
  'groups' => [
    [
      'label' => 'Text Heavy',
      'types' => ['copy'],
    ],
    // [
    //   'label' => 'Imagery',
    //   'types' => [],
    // ],
    [
      'label' => 'Other',
      'types' => ['fragments', 'callToAction', 'relatedEntries'],
    ],
  ],
];

return [
    'fields' => [
        'contentBuilder' => [
            '*' => $globalConfig,
            'section:fragments' => array_merge_recursive($globalConfig, [
              'hiddenTypes' => ['fragments'],
            ]),
        ],
    ],
];