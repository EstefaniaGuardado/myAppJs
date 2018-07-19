/* global $ */
function setQuantityInput(unitySelect) {
  const selectedOption = $(unitySelect).find(':selected').val();

<<<<<<< HEAD
  if (selectedOption === 'gr' || selectedOption === 'mL') {
    $('input#quantityInput').attr('value', 50);
    $('input#quantityInput').attr('step', 50);
    $('input#quantityInput').attr('max', 100000);
    $('input#quantityInput').attr('min', 50);
  } else {
    $('input#quantityInput').attr('value', 1);
    $('input#quantityInput').attr('step', 1);
    $('input#quantityInput').attr('max', 100);
    $('input#quantityInput').attr('min', 1);
  }
}

function setUnitySelect(unities) {
  unities.forEach((unit) => {
    $('select#unitySelect').append($('<option>', {
      selected: false,
      value: unit,
      text: unit,
    }));
  });

  $('select#unitySelect option:eq(0)').prop('selected', true);
  setQuantityInput($('select#unitySelect'));
  $('li#unity').show();
  $('li#quantity').show();
  $('li#submitNewItem').show();
}

$('select#selectProducts').change(function createUnitiesSelect() {
  const hasPreviousOptions = $('select#unitySelect').children('option').length > 0;

  if (hasPreviousOptions) {
    $('select#unitySelect option').remove();
  }

  const selectedOption = $(this).find(':selected').val();

  $.ajax({
    headers: { accept: 'application/json' },
    url: `/products/${selectedOption}`,
    type: 'GET',
    success: (data) => {
      setUnitySelect(data.unities);
    },
  });
});

$('select#unitySelect').change(function createQuantityInput() {
  setQuantityInput($(this));
  $('li#quantity').show();
});

=======
>>>>>>> 43dc2f7b2ef9d8ac27e89f25f761c07d1c27b2d5
$('form#itemForm').keypress(function enterSubmitEvent(e) {
  if (e.keyCode === $.ui.keyCode.ENTER) {
    e.preventDefault();
    $(this).parent().find('input#addItemButton').trigger('click');
  }
});

$('button#deleteItemButton').click(function deleteHandler(deleteEvent) {
  deleteEvent.preventDefault();
  const $tr = $(this).closest('tr');
  $.ajax({
    headers: { accept: 'application/json' },
    url: `/item/${this.value}`,
    type: 'DELETE',
    success() {
      $tr.remove();
    },
  });
});


$('button#modifyItemButton').click(function modifyHandler(event) {
  event.preventDefault();

  const idItemSelected = $(this).closest('tr').attr('id');
  const currentCellNameItem = $(this).closest(`tr#${idItemSelected}`).children().eq(1);

  function saveChange(modalEvent) {
    modalEvent.preventDefault();

    const newNameItem = $(this).find('input#modifiedNameItem').val();
    $.ajax({
      headers: { accept: 'application/json' },
      type: 'PUT',
      url: `/item/${idItemSelected}`,
      data: { name: newNameItem },
      success: function successUpdate(e) {
        e.preventDefault();
        currentCellNameItem.replaceWith(`<td>${newNameItem}</td>`);
        $(this).dialog('close');
      },
    });
  }

  function cancelChange() {
    $(this).dialog('close');
  }

  function enterEvent() {

    $('#dialog-confirm').keypress(function enterKeyPress(e) {
      if (e.keyCode === $.ui.keyCode.ENTER) {
        $(this).parent().find('button:contains(\'Save\')').trigger('click');
      }
    });
  }

  $('#dialog-confirm').dialog({
    closeOnEscape: false,
    resizable: false,
    height: 'auto',
    width: 400,
    modal: true,
    buttons: {
      Save: saveChange,
      Cancel: cancelChange,
    },
    open: enterEvent,
  });
});
