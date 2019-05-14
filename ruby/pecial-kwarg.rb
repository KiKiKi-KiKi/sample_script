def total(price, tax = 0.08, discount = 0, include_tax = false)
  sub_account = price - discount
  total =
    if include_tax
      tax_account = (sub_account / ((1 + tax) * 100) * (tax * 100)).round
      sub_account
    else
      tax_account = (sub_account * (tax * 100) / 100).round
      sub_account + tax_account
    end
  puts "
  Price: #{price} Discount: #{discount} Tax rate: #{tax}
  Total: #{total.round}
  Tax: #{tax_account} #{'(Internal tax)' if include_tax}
  -------------------"
end

total(10000, 0.08, 3000)
total(10000, 0.08, 0, true)

p 'キーワード引数'

def total_with_keyword(price: , tax: 0.08, discount: 0, include_tax: false)
  sub_account = price - discount
  total =
    if include_tax
      tax_account = (sub_account / ((1 + tax) * 100) * (tax * 100)).round
      sub_account
    else
      tax_account = (sub_account * (tax * 100) / 100).round
      sub_account + tax_account
    end
  puts "
  Price: #{price} Discount: #{discount} Tax rate: #{tax}
  Total: #{total.round}
  Tax: #{tax_account} #{'(Internal tax)' if include_tax}
  -------------------"
end

total_with_keyword(price: 10000, tax: 0.08, discount: 3000)
total_with_keyword(include_tax: true, price: 10000, tax: 0.08)
