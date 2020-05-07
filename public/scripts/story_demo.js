// Javascript for single story page.

// create new contribution when form submitted
$(document).ready(() => {
  $('#new-contribution').on('submit', function (event) {
    event.preventDefault();
    const url = window.location.pathname;
    const storyId = getStoryId(url);
    const content = $(this).children('textarea')[0].value;
    const data = {
      story_id: storyId,
      content: content,
    }

    $.post('/stories/:story_id/contributions', data)
      .done(function (res) {
        renderPost(JSON.parse(res));
      });
  });

  // dummy upvote functionality
  $('#contribution-container').on('click', '.upvote', function (event) {
    event.preventDefault();
    const self = this
    if ($(self).hasClass('on')) {
      const upvoteCount = $(self).siblings('p')[0].innerHTML;

      $(self).siblings('p')[0].innerHTML = Number(upvoteCount) - 1;
      $(self).css('opacity', 0.5);
      $(self).toggleClass('on');
    } else {
      const upvoteCount = $(self).siblings('p')[0].innerHTML;

      $(self).siblings('p')[0].innerHTML = Number(upvoteCount) + 1;
      $(self).css('opacity', 1);
      $(self).toggleClass('on');
      $(self).addClass('on');
    }
  });

  // parse story id out of url
  const getStoryId = (url) => {
    let parseUrl = url.replace('/stories/', '');

    parseUrl = parseUrl.replace('/contributions', '');
    return parseUrl;
  };

  // creates new contribution post
  const renderPost = (post) => {
    const newPost = `
    <article class="contribution">
                <p>${post.content}</p>
                <footer>
                  <div>
                    <button class="upvote" ><img src="/images/hands-and-gestures.png" alt=""></button>
                    <p>${post.upvotes}</p>
                  </div>
                  <div>
                    <h4>${post.name}</h4>
                      <button id="${post.id}" class="merge">Merge</button>
                  </div>
                </footer>
            </article>
    `;

    $('#contribution-container').prepend(newPost);
    $('#add-contribution').val('');
  };

});