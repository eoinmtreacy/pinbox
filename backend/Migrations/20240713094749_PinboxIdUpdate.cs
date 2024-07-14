using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class PinboxIdUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Pinbox_Id",
                table: "AspNetUsers",
                newName: "PinboxId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_Pinbox_Id",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_PinboxId");

            migrationBuilder.AlterColumn<int>(
                name: "Num_Likes",
                table: "places",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldDefaultValue: 0L);

            migrationBuilder.AlterColumn<int>(
                name: "Num_Dislikes",
                table: "places",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldDefaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "amenities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    Cuisine_Pizza = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Chinese = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Coffee_Shop = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Mexican = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Italian = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Burger = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Donut = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Sandwich = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_Japanese = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cuisine_American = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Diet_Vegan = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Drink_Beer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Drink_Tea = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Drink_Wine = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Outdoor_Seating = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Wheelchair = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_amenities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_amenities_places_Id",
                        column: x => x.Id,
                        principalTable: "places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "friends",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false),
                    user_friend_id = table.Column<int>(type: "int", nullable: false),
                    timestamp = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_friends", x => new { x.user_id, x.user_friend_id });
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "userlikes",
                columns: table => new
                {
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    place_id = table.Column<long>(type: "bigint", nullable: false),
                    place_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    index = table.Column<long>(type: "bigint", nullable: false),
                    category_swipe = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    timestamp = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userlikes", x => new { x.user_id, x.place_id, x.place_type });
                    table.ForeignKey(
                        name: "FK_userlikes_places_place_id",
                        column: x => x.place_id,
                        principalTable: "places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_userlikes_place_id",
                table: "userlikes",
                column: "place_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "amenities");

            migrationBuilder.DropTable(
                name: "friends");

            migrationBuilder.DropTable(
                name: "userlikes");

            migrationBuilder.RenameColumn(
                name: "PinboxId",
                table: "AspNetUsers",
                newName: "Pinbox_Id");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_PinboxId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_Pinbox_Id");

            migrationBuilder.AlterColumn<long>(
                name: "Num_Likes",
                table: "places",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);

            migrationBuilder.AlterColumn<long>(
                name: "Num_Dislikes",
                table: "places",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);
        }
    }
}
