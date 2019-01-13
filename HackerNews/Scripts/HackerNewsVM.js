function HackerNewsVM() {
    init: {
        var self = this;
        self.TopStories = ko.observableArray([]);

        $.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', function (data) {
            self.TopStories.removeAll();
            ko.utils.arrayForEach(data, function (dataItem) {
                $.getJSON('https://hacker-news.firebaseio.com/v0/item/' + dataItem + '.json?print=pretty', function (data) {
                    self.TopStories().push(new Story(dataItem, data));
                    self.TopStories.valueHasMutated();
                });
            });
        });
    }
}

function Comment(data) {
    var self = this;
    self.By = ko.observable(data.by);
    self.ID = ko.observable(data.id);
    self.Kids = ko.observableArray(data.kids);
    self.Parent = ko.observable(data.parent);
    self.Time = ko.observable(data.time);
    self.Text = ko.observable(data.text);
}

function Story(id, data) {
    var self = this;
    self.ID = id;
    self.Author = ko.observable('');
    self.Time = ko.observable('');
    self.URL = ko.observable('');
    self.Title = ko.observable('');
    self.Kids = ko.observableArray([]);
    self.Score = ko.observable();
    self.Descendants = ko.observable(0);
    self.Comments = ko.observableArray([]);
    self.ShowComments = ko.observable(false);

    self.Title(data.title);
    self.Author(data.by);
    self.Kids(data.kids);
    self.Score(data.score);
    self.Time(data.time);
    self.URL(data.url);
    self.Descendants(data.descendants);

    self.ItemClick = function () {
        if (self.ShowComments()) {
            self.Comments.removeAll();
            self.Comments.valueHasMutated();
            self.ShowComments(false);
        } else {
            self.Comments.removeAll();
            self.ShowComments(true);

            ko.utils.arrayForEach(self.Kids(), function (child) {
                $.getJSON('https://hacker-news.firebaseio.com/v0/item/' + child + '.json?print=pretty', function (commentData) {
                    self.Comments().push(new Comment(commentData));
                    self.Comments.valueHasMutated();
                });
            });

        }
    };
}