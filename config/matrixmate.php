<?php

  return [
    'fields' => [
      'contentBuilder' => [
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

        // groups and types need to be copied from above
        // to apply to the fragments channel.
        'section:fragments' => [
          'hiddenTypes' => ['fragments'],
        ],
      ],
    ],
  ];