<?php

return [
  'fields' => [
    // content builder
    'contentBuilder' => [
      // 'defaultTabName' => 'Additional Settings',
      // 'groups' => [
      //   [
      //     'label' => 'Text Heavy',
      //     'types' => ['copy', 'copyFloatedImage', 'ctaCopy'],
      //   ],
      //   [
      //     'label' => 'Imagery',
      //     'types' => ['fullWidthImage', 'gallery', 'slideshow'],
      //   ],
      //   [
      //     'label' => 'Other',
      //     'types' => ['fragments', 'embedCode', 'entryCards', 'alternatingEntries', 'related3Content'],
      //   ],
      // ],

      // hide fragments block from fragment channel
      'section:fragments' => [
        'hiddenTypes' => ['fragments'],
      ],
    ],
  ],
];