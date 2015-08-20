$(document).ready(
  function() {
    $('div.hFinderDirectory').mousedown(
      function() {
        $('div.hFinderDirectory').not(this)
          .find('div.hFinderIcon')
            .removeClass('hFinderIconSelected');

        $('div.hFinderDirectory').not(this)
          .find('div.hFinderDirectoryName span')
            .removeClass('hFinderDirectoryNameSelected');

        $(this).find('div.hFinderIcon')
          .addClass('hFinderIconSelected');

        $(this).find('div.hFinderDirectoryName span')
          .addClass('hFinderDirectoryNameSelected');
      }
    );
//    .draggable({
//            helper:'clone',
//            opacity:0.5
//        });

      var dragElement;
      $('div.hFinderDirectory').each(
          function() {
              this.addEventListener(
                  'dragstart',function($e) {
                      $e.dataTransfer.setData('Text',$(this).attr('title'));

                      dragElement = $(this);
                  },false
              );

              this.addEventListener(
                  'dragenter',
                  function($e) {
                      $e.preventDefault();
                  },false
              );

              this.addEventListener(
                  'dragover',
                  function($e) {
                      $e.preventDefault();
                      if(dragElement.attr('title') != $(this).attr('title')){
                          $(this).addClass('hFinderDirectoryDrop');
                      }
                  }
              );

              this.addEventListener(
                  'dragleave',
                  function($e) {
                      $e.preventDefault();
                      $(this).removeClass('hFinderDirectoryDrop');
                  }
              );

              this.addEventListener(
                  'drop',
                  function($e) {
                      var $path = $e.dataTransfer.getData('Text');

                      dragElement.remove();
                      $e.preventDefault();
                  },false
              );
          }
      );
  }
);

//$(document).ready(
//    function() {
//        $('div.hFinderDirectory').mousedown(
//            function() {
//                $('div.hFinderDirectory').not(this)
//                    .find('div.hFinderIcon')
//                    .removeClass('hFinderIconSelected');
//                $('div.hFinderDirectory').not(this)
//                    .find('div.hFinderDirectoryName span')
//                    .removeClass('hFinderDirectoryNameSelected');
//                $(this).find('div.hFinderIcon')
//                    .addClass('hFinderIconSelected');
//                $(this).find('div.hFinderDirectoryName span')
//                    .addClass('hFinderDirectoryNameSelected');
//            }
//        )
//
//        if (!($.support.safari && navigator.appVersion.indexOf('Mac') != -1)) {
//            $('div.hFinderDirectory').draggable({
//                helper:'clone',
//                opacity:0.5
//            });
//        }
//    }
//);