<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="HackerNews.Default" Title="Hacker News" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Content/font-awesome.css" rel="stylesheet" />
    <link href="Content/MainStyle.css" rel="stylesheet" />
    <script src="Scripts/jquery-3.3.1.js"></script>
    <script src="Scripts/knockout-3.4.2.js"></script>
    <script src="Scripts/HackerNewsVM.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var vm = new HackerNewsVM();
            ko.applyBindings(vm);
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="title">Hacker News</div>
            <div data-bind="foreach: TopStories">
                <div class="newsItem" data-bind="click: ItemClick.bind($data)">
                    <div class="newsItemTitle">
                        <a data-bind="attr: { href: URL, title: Title }, text: Title" target="_blank"></a>
                    </div>
                    <div class="comments" data-bind="visible: ShowComments, foreach: Comments">
                        <div class="commentContainer">
                            <div>
                                <label data-bind="text: Text"></label>
                            </div>
                            <div>
                                by
                            <label data-bind="text: By"></label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="commentText" >
                            <label data-bind="text: Score"></label>
                            points by
                            <label data-bind="text: Author"></label>
                            |
                            
                                <label data-bind="text: Descendants"></label>
                            Comments <span class="fa fa-comments"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
