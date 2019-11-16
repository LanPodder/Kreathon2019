using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Kreathon2019.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : Controller
    {
        private readonly ILogger<ImageController> _logger;

        public ImageController(ILogger<ImageController> logger)
        {
            _logger = logger;
        }

        [HttpPost("/baseimage")]
        public ActionResult<List<ContainerData>> PostImage([FromBody] BaseImage img)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://3.209.31.93:5001/classifier");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{\"in_base64_string\":\"" + img.in_base64_string + "\"}";
                streamWriter.Write(json);
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            List<string> l = new List<string>();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                dynamic result = JsonConvert.DeserializeObject(streamReader.ReadToEnd());
                Console.WriteLine(result);
                foreach (var item in result)
                {
                    l.Add(item.Name);
                }
            }

            List<ContainerData> data = new List<ContainerData>();
            Dictionary<string, string> d = new Dictionary<string, string>();
            d.Add("metal", "Baumischabfall Schwer");
            d.Add("others", "Baumischabfall leicht");
            d.Add("paper", "Baumischabfall Schwer");
            d.Add("glass", "Sperrgut");
            d.Add("plastic", "Baumischabfall Leicht");
            d.Add("cardboard", "Leichtbaustoffe");

            var rng = new Random();
            foreach (var item in l)
            {
                if(item.Equals("top_result")){
                    continue;
                }
                data.Add(new ContainerData(d[item], rng.Next(200, 600), rng.Next(1, 4)));
            }


            var o = Ok(data);
            Console.WriteLine("response: " + o + " - " + data);
            return o;
        }
    }
}
