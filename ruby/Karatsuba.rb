# refs. komasaru/multiply_karatsuba.rb
#       https://gist.github.com/komasaru/5370005
# FYI: http://www.mk-mode.com/octopress/2013/04/25/cpp-big-multiply-karatsuba/
#*********************************************
# 多倍長乗算 ( by Karatsuba 法 )
#   - 多倍長 * 多倍長
#   - 最下位の桁を配列の先頭とする考え方
#*********************************************
#
D_MAX = 1024  # 計算可能な最大桁数 ( 2 のべき乗 )
D     = 1024  # 実際に計算する桁数 ( D_MAX 以下 )

class MultiplyKaratsuba
  def initialize
    # ====================================== #
    # テストなので、被乗数・乗数は乱数を使用 #
    # ====================================== #
    @a_0 = Array.new
    @b_0 = Array.new
    rnd_a = Random.new(0)
    rnd_b = Random.new(1)

    # 被乗数・乗数設定
    0.upto(D - 1) do |i|
      @a_0 << rnd_a.rand(10)
      @b_0 << rnd_b.rand(10)
    end
  end

  # 計算 ( 標準(筆算)法 )
  def calc_karatsuba
    # 配列初期設定 ( コンストラクタで生成した配列を使用 )
    a = @a_0       # 被乗数配列
    b = @b_0       # 乗数配列
    z = Array.new  # 計算結果用配列

    # 最大桁に満たない部分は 0 を設定
    (D_MAX - a.size).times {|i| a << 0}
    (D_MAX - b.size).times {|i| b << 0}

    # ====[ TEST ]===>
    # t1 = Time.now      # 計算開始時刻
    # 100.times do |l|   # 100 回 LOOP
    # @cnt_mul = 0       # 乗算回数リセット
    # <===[ TEST ]====

    # 乗算 ( Karatsuba 法 )
    z = multiply_karatsuba(a, b)

    # 繰り上がり処理
    z = do_carry(z);
    # ====[ TEST ]===>
    # end
    # t2 = Time.now      # 計算終了時刻
    # @tt = t2 - t1      # 計算時間
    # <===[ TEST ]====

    # 結果出力
    display(a, b, z);
  end

  # 乗算 ( 標準(筆算)法 )
  def multiply_normal(a, b)
    # 配列サイズ取得
    a_len = a.size
    b_len = b.size

    # 計算結果初期化
    z = Array.new(a_len + b_len, 0)

    # 各配列を各桁とみなして乗算
    0.upto(b_len - 1) do |j|
      0.upto(a_len - 1) do |i|
        z[j + i] += a[i] * b[j];
        # ====[ TEST ]===>
        # @cnt_mul += 1  # 乗算カウント
        # <===[ TEST ]====
      end
    end
    return z
  end

  # 乗算 ( Karatsuba 法 )
  def multiply_karatsuba(a, b)
    # 配列サイズ取得
    t_len = a.size

    # ４桁（配列４個）になった場合は標準乗算
    return multiply_normal(a, b)  if (t_len <= 4)

    # 配列分割
    a_1 = a[(t_len / 2)..-1]
    a_0 = a[0..(t_len / 2 - 1)]
    b_1 = b[(t_len / 2)..-1]
    b_0 = b[0..(t_len / 2 - 1)]


    # v = a1 + a0, w = b1 + b0
    v = Array.new
    w = Array.new
    0.upto(t_len / 2 - 1) do |i|
      v << a_1[i] + a_0[i]
      w << b_1[i] + b_0[i]
    end

    # x1 = a0 * b0
    x_1 = multiply_karatsuba(a_0, b_0)

    # x2 = a1 * b1
    x_2 = multiply_karatsuba(a_1, b_1)

    # x3 = (a1 + a0) * (b1 + b0)
    x_3 = multiply_karatsuba(v,  w)

    # x3 = x3 - x1 - x2
    0.upto(t_len - 1) {|i| x_3[i] -= x_1[i] + x_2[i]}

    # z = x2 * R^2 + (x3 - x2 - x1) * R + x1
    z = x_1 + x_2
    0.upto(t_len - 1) {|i| z[i + t_len / 2] += x_3[i]}

    return z
  end

  # 繰り上がり処理
  def do_carry(a)
    cr = 0  # 繰り上がり
    0.upto(a.size - 1) do |i|
      a[i] += cr
      cr = a[i] / 10
      a[i] -= cr * 10
    end

    # オーバーフロー時
    puts "[ OVERFLOW!! ] #{cr}" unless cr == 0

    return a
  end

  # 結果出力
  def display(a, b, z)
    # 上位桁の不要な 0 を削除するために、配列サイズを取得
    aLen = D_MAX; bLen = D_MAX; zLen = D_MAX * 2
    while a[aLen - 1] == 0 do aLen -= 1 if a[aLen - 1] == 0 end
    while b[bLen - 1] == 0 do bLen -= 1 if b[bLen - 1] == 0 end
    while z[zLen - 1] == 0 do zLen -= 1 if z[zLen - 1] == 0 end

    # a 値
    puts "a ="
    (aLen - 1).downto(0) do |i|
        print a[i]
        print " " if (aLen - i) % 10 == 0
        puts if (aLen - i) % 50 == 0
    end
    puts

    # b 値
    puts "b ="
    (bLen - 1).downto(0) do |i|
        print b[i]
        print " " if (bLen - i) % 10 == 0
        puts if (bLen - i) % 50 == 0
    end
    puts

    # z 値
    puts "z ="
    (zLen - 1).downto(0) do |i|
        print z[i]
        print " " if (zLen - i) % 10 == 0
        puts if (zLen - i) % 50 == 0
    end
    puts; puts

    # ====[ TEST ]====
    # puts "Counts of multiply / 1 loop = #{@cnt_mul}"     # 乗算回数
    # puts "Total time of all loops     = #{@tt} seconds"  # 処理時間
    # ====[ TEST ]====
  end
end

# メイン処理
begin
  # 計算クラスインスタンス化
  obj_calc = MultiplyKaratsuba.new

  # 乗算 ( Karatsuba 法 )
  obj_calc.calc_karatsuba
rescue => e
  # エラーメッセージ
  puts "[例外発生] #{e}"
end
