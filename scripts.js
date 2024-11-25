function removeItem(element) {
  $(element).closest('tr').remove();
  updateSummary();
}

function addItem() {
  var newRow = `
      <tr>
          <td>
              <div class="d-flex">
                  <div class="cart-item-image bg-success d-flex justify-content-center align-items-center">
                      <h6>Image</h6>
                  </div>
                  <div class="ml-3">
                      <h5>New Item</h5>
                      <p class="text-muted">PS4</p>
                      <button class="btn btn-link text-danger p-0" onclick="removeItem(this)">Remove</button>
                  </div>
              </div>
          </td>
          <td>
              <div class="d-flex align-items-center">
                  <button class="btn btn-dark btn-sm" onclick="updateQuantity(this, -1)">-</button>
                  <input type="text" class="form-control text-center mx-2" value="1" style="width: 50px;" readonly>
                  <button class="btn btn-dark btn-sm" onclick="updateQuantity(this, 1)">+</button>
              </div>
          </td>
          <td>£49.99</td>
          <td class="item-total">£49.99</td>
      </tr>
  `;
  $('#cart-items').append(newRow);
  updateSummary();
}

function updateQuantity(element, value) {
  var input = $(element).closest('td').find('input');
  var currentValue = parseInt(input.val());
  var newValue = currentValue + value;
  if (newValue < 1) {
      newValue = 1;
  }
  input.val(newValue);
  updateItemTotal(element);
  updateSummary();
}

function updateItemTotal(element) {
  var price = $(element).closest('tr').find('td:eq(2)').text().replace('£', '');
  var quantity = $(element).closest('tr').find('input').val();
  var total = price * quantity;
  $(element).closest('tr').find('td:eq(3)').text('£' + total.toFixed(2));
}

function updateSummary() {
  var totalItems = $('#cart-items tr').length;
  var totalCost = 0;
  $('#cart-items tr').each(function() {
      totalCost += parseFloat($(this).find('td:eq(3)').text().replace('£', ''));
  });
  $('#summary-items').text('£' + totalCost.toFixed(2));
  $('#total-cost').text('£' + (totalCost + parseFloat($('#shipping').val())).toFixed(2));
}

function showPaymentSection() {
  $('#payment-section').show();
}