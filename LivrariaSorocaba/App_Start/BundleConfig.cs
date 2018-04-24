using System.Web;
using System.Web.Optimization;

namespace LivrariaSorocaba
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/App/js/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/App/js/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/App/js/angular.min.js",
                        "~/App/js/angular-route.min.js",
                        "~/App/js/angular-animate.min.js",
                        "~/App/js/angular-ui-router.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/controller").Include(
                        "~/App/modules/books/*.js",
                        "~/App/modules/edit/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/service").Include(
                        "~/App/utils/http-service.utils.js",
                        "~/App/services/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/mainController").Include(
                        "~/App/livrariaSorocaba.js",
                        "~/App/livrariaSorocaba.controller.js",
                        "~/App/livrariaSorocaba.config.js"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/App/js/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/App/js/bootstrap.js",
                      "~/App/js/respond.js"));

            bundles.Add(new StyleBundle("~/Assets/css").Include(
                      "~/Assets/css/bootstrap.css",
                      "~/Assets/css/site.css"));
        }
    }
}
