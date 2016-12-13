'use strict';
(function() {
  $.getJSON('/uploads')
    .done((files) => {
      for (let file of files) {
        var name = file.name;
        var username = file.username;
        var created_at = file.created_at;
        // TODO: change category to the download_path, category is temporarily being used as the download path for client's 'file download' links
        var path = file.category;
        $('#table tr:last').after('<tr class="delete-button"><td><a href="' + path + '" download>' + name + '</a></td><td>' + username + '</td><td>' + created_at + '</td><td >x</td></tr>');
      }
      $('.delete-button').on('click', function(){
        var pathStr = this.innerHTML;
        var fileCat = pathStr.slice(pathStr.indexOf('"') + 1, pathStr.indexOf('download') - 2);
        console.log(fileCat);

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ fileCat }),
          type: 'DELETE',
          url: '/uploads'
        };
        $.ajax(options)
          .done(() => {
            window.location.href = '/user-landing-admin.html';
          })
          .fail(($xhr) => {
            console.log("Delete failed");
          });

      });
    })
    .fail(() => {
      console.log("Unable to retrieve files");
    });
})();


// }):