<?php

$globalConfig = [
  'defaultTabName' => 'Content',
  'defaultTabFirst' => true,
  'groups' => [
    [
      'label' => 'Text Heavy',
      'types' => ['copy'],
    ],
    [
      'label' => 'Related',
      'types' => ['relatedEntries', 'fragments'],
    ],
    [
      'label' => 'Other',
      'types' => ['callToAction', 'video', 'codeEmbed'],
    ],
  ],
  'types' => [
    'copy' => [
      'tabs' => [
        [
          'label' => 'Settings',
          'fields' => ['padding'],
        ]
      ],
    ],
    'video' => [
      'tabs' => [
        [
          'label' => 'Settings',
          'fields' => ['padding'],
        ]
      ],
    ],
    'relatedEntries' => [
      'tabs' => [
        [
          'label' => 'Settings',
          'fields' => ['padding'],
        ]
      ],
    ],
    'codeEmbed' => [
      'tabs' => [
        [
          'label' => 'Settings',
          'fields' => ['padding'],
        ]
      ],
    ]
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