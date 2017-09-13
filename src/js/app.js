const castMemberMultipleEpisode = $('.castMemberMultipleEpisode');
const $form = $('form');
const $burger = $('.navbar-burger');
const $menu = $('.navbar-menu');

castMemberMultipleEpisode.select2();

$form.validate();

$burger.on('click', () => {
  $burger.toggleClass('is-active');
  $menu.toggleClass('is-active');
});
