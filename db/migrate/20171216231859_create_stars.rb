class CreateStars < ActiveRecord::Migration[5.1]
  def change
    create_table :stars do |t|
      t.integer :donor_id
      t.integer :recipient_id

      t.timestamps
    end
  end
end
