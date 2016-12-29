class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uid
      t.string :email
      t.string :first_name
      t.string :last_name
      t.integer :bp_id
      t.datetime :last_signed_in_at
      t.datetime :last_sign_in_check

      t.timestamps
    end
  end
end
