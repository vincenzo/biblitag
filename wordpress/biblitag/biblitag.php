<?php

/**
 * Plugin Name: Biblitag
 * Plugin URI: https://github.com/vincenzo/biblitag
 * Description: This Plugin allows to linkify Bible reference in a text.
 * Version: 0.2
 * Author: Vincenzo Russo
 * Author URI: http://artetecha.com
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Library General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 ***/

function biblitag_enqueue_scripts() {
  wp_enqueue_script(
    'bcv',
    'http://vincenzo.github.io/biblitag/bcv/it_bcv_parser.min.js'
  );
  wp_enqueue_script(
    'biblitag',
    'http://vincenzo.github.io/biblitag/biblitag.js',
    array('jquery')
  );
}

function biblitag_init_script() {
?>
  <script type='text/javascript'>
    BIBLITAG.init(null, null, '#content');
  </script>
<?php
}

add_action( 'wp_enqueue_scripts', 'biblitag_enqueue_scripts' );
add_action( 'wp_footer', 'biblitag_init_script' );
