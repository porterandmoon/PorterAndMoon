using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PorterAndMoon.Models.Product;

namespace PorterAndMoon.Connections
{
    public class SeatConnections
    {
        readonly string ConnectionString;

        public SeatConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<Seat> GetSeats(int productId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select Price, Seat.Id, Seat.ProductId, CustomerId, Premium, SeatNumber, RowLength, IsPurchased, Seat.Type
                                    From Seat
                                    Join Product on Product.Id = ProductId
                                    Where ProductId = @ProductId";
                var seats = connection.Query<Seat>(queryString, new { productId });
                return seats;
            }
            throw new Exception("Could not get seats");
        }

        public Seat UpdateSold(Seat updatedSeat)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Seat
                                    Set isPurchased = (isPurchased ^ 1), CustomerId = @CustomerId
                                    Where Id = @Id";
                var seat = connection.QueryFirstOrDefault<Seat>(queryString, updatedSeat);
                if (seat != null)
                {
                    return seat;
                }
            }
            throw new Exception("Could not update seat");
        }

        public int CreateSeats(NewFlightSeat newFlight)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Insert into Seat(productId, isPurchased, [type], premium, seatNumber, rowLength)
                                    Select 
	                                    @productId, 
	                                    0, 
	                                    Case 
		                                    When n.Number <= @NumPremium Then 'First Class'
		                                    Else 'Coach'
	                                    End,
	                                    Case 
		                                    When n.Number <= @NumPremium Then @Premium
		                                    Else 1
	                                    End, 
	                                    Convert(nvarchar(10), (Floor(n.Number / @rowSeats) + 1)) + '-' + Convert(nvarchar(10), (n.Number % @rowSeats) + 1),
                                        @rowSeats
                                    From SeatNumber as n
	                                    Where n.Number <= @NumSeats";
                var Seats = connection.QueryFirstOrDefault<int>(queryString, newFlight);
                return Seats;
            }
            throw new Exception("Could not create seats");  
        }
    }
}
